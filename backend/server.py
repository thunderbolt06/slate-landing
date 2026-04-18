from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class WaitlistEntry(BaseModel):
    email: str


class WaitlistResponse(BaseModel):
    status: str
    message: str


def send_welcome_email(to_email: str):
    sendgrid_key = os.environ.get('SENDGRID_API_KEY')
    sender_email = os.environ.get('SENDER_EMAIL')

    if not sendgrid_key or not sender_email:
        logger.warning("SendGrid not configured, skipping email send")
        return False

    try:
        from sendgrid import SendGridAPIClient
        from sendgrid.helpers.mail import Mail

        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #FDFDFD;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="font-size: 48px; color: #073B4C; margin: 0; font-weight: 900; letter-spacing: -2px;">SLATE</h1>
            </div>
            <div style="background: white; border: 3px solid #073B4C; border-radius: 20px; padding: 30px; box-shadow: 6px 6px 0px #073B4C;">
                <h2 style="color: #073B4C; font-size: 24px; margin-top: 0;">Welcome to the future of learning!</h2>
                <p style="color: #495057; font-size: 16px; line-height: 1.6;">
                    You're now on the SLATE UP waitlist! We're building an AI-powered interactive classroom
                    where you can learn anything with personalized courses, smart AI classmates, and engaging narration.
                </p>
                <p style="color: #495057; font-size: 16px; line-height: 1.6; font-weight: bold;">Here's what awaits you:</p>
                <ul style="color: #495057; font-size: 16px; line-height: 2;">
                    <li>Personalized course generation on any topic</li>
                    <li>AI classmates: Notes Taker, Deep Thinker, Funny Mate</li>
                    <li>Interactive slides with narration</li>
                    <li>Learn at your own pace</li>
                </ul>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://app.slateup.ai" style="background-color: #EF476F; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 16px; border: 2px solid #073B4C; display: inline-block;">Enter SLATE UP</a>
                </div>
            </div>
            <p style="color: #495057; font-size: 14px; text-align: center; margin-top: 20px;">
                Stay curious,<br/><strong>The Slate Up Team</strong>
            </p>
        </div>
        """

        message = Mail(
            from_email=sender_email,
            to_emails=to_email,
            subject="Welcome to SLATE UP!",
            html_content=html_content
        )

        sg = SendGridAPIClient(sendgrid_key)
        response = sg.send(message)
        logger.info(f"Welcome email sent to {to_email}, status: {response.status_code}")
        return True
    except Exception as e:
        logger.error(f"Failed to send welcome email to {to_email}: {str(e)}")
        return False


@api_router.get("/")
async def root():
    return {"message": "SLATE API"}


@api_router.post("/waitlist", response_model=WaitlistResponse)
async def join_waitlist(entry: WaitlistEntry, background_tasks: BackgroundTasks):
    if not entry.email or '@' not in entry.email:
        raise HTTPException(status_code=400, detail="Invalid email address")

    existing = await db.waitlist.find_one({"email": entry.email}, {"_id": 0})
    if existing:
        return WaitlistResponse(status="success", message="You're already on the waitlist!")

    doc = {
        "id": str(uuid.uuid4()),
        "email": entry.email,
        "joined_at": datetime.now(timezone.utc).isoformat()
    }
    await db.waitlist.insert_one(doc)

    background_tasks.add_task(send_welcome_email, entry.email)

    return WaitlistResponse(status="success", message="Welcome to the SLATE UP waitlist! Check your email.")


@api_router.get("/waitlist/count")
async def get_waitlist_count():
    count = await db.waitlist.count_documents({})
    return {"count": count}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
