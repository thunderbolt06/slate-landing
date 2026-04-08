import requests
import sys
import json
from datetime import datetime

class SlateAPITester:
    def __init__(self, base_url="https://ai-classroom-69.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_response_keys=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"   Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json()
                print(f"   Response Data: {json.dumps(response_data, indent=2)}")
            except:
                print(f"   Response Text: {response.text}")

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check expected response keys if provided
                if expected_response_keys and response_data:
                    for key in expected_response_keys:
                        if key not in response_data:
                            print(f"⚠️  Warning: Expected key '{key}' not found in response")
                            success = False
                        else:
                            print(f"   ✓ Found expected key: {key}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")

            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": response_data,
                "data_sent": data
            })

            return success, response_data

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e),
                "data_sent": data
            })
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "api/",
            200,
            expected_response_keys=["message"]
        )

    def test_waitlist_count_initial(self):
        """Test getting waitlist count"""
        success, response = self.run_test(
            "Get Waitlist Count",
            "GET",
            "api/waitlist/count",
            200,
            expected_response_keys=["count"]
        )
        if success:
            self.initial_count = response.get('count', 0)
            print(f"   Initial waitlist count: {self.initial_count}")
        return success

    def test_join_waitlist_new_email(self):
        """Test joining waitlist with new email"""
        test_email = f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        success, response = self.run_test(
            "Join Waitlist - New Email",
            "POST",
            "api/waitlist",
            200,
            data={"email": test_email},
            expected_response_keys=["status", "message"]
        )
        if success:
            self.test_email = test_email
            print(f"   Successfully added email: {test_email}")
        return success

    def test_join_waitlist_duplicate_email(self):
        """Test joining waitlist with duplicate email"""
        if not hasattr(self, 'test_email'):
            print("❌ Skipping duplicate test - no test email available")
            return False
            
        return self.run_test(
            "Join Waitlist - Duplicate Email",
            "POST",
            "api/waitlist",
            200,
            data={"email": self.test_email},
            expected_response_keys=["status", "message"]
        )

    def test_join_waitlist_invalid_email(self):
        """Test joining waitlist with invalid email"""
        return self.run_test(
            "Join Waitlist - Invalid Email",
            "POST",
            "api/waitlist",
            400,
            data={"email": "invalid-email"}
        )

    def test_waitlist_count_after_addition(self):
        """Test waitlist count after adding email"""
        success, response = self.run_test(
            "Get Waitlist Count After Addition",
            "GET",
            "api/waitlist/count",
            200,
            expected_response_keys=["count"]
        )
        if success and hasattr(self, 'initial_count'):
            new_count = response.get('count', 0)
            expected_count = self.initial_count + 1
            if new_count >= expected_count:
                print(f"   ✓ Count increased correctly: {self.initial_count} → {new_count}")
            else:
                print(f"   ⚠️  Count may not have increased as expected: {self.initial_count} → {new_count}")
        return success

def main():
    print("🚀 Starting SLATE API Testing...")
    print("=" * 50)
    
    # Setup
    tester = SlateAPITester()
    
    # Run tests in sequence
    tests = [
        tester.test_api_root,
        tester.test_waitlist_count_initial,
        tester.test_join_waitlist_new_email,
        tester.test_join_waitlist_duplicate_email,
        tester.test_join_waitlist_invalid_email,
        tester.test_waitlist_count_after_addition,
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print summary
    print("\n" + "=" * 50)
    print(f"📊 Test Summary:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "0%")
    
    # Print failed tests
    failed_tests = [t for t in tester.test_results if not t['success']]
    if failed_tests:
        print(f"\n❌ Failed Tests ({len(failed_tests)}):")
        for test in failed_tests:
            error_msg = test.get('error', f'Status {test.get("actual_status", "unknown")}')
            print(f"   • {test['name']}: {error_msg}")
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": (tester.tests_passed/tester.tests_run*100) if tester.tests_run > 0 else 0
            },
            "test_results": tester.test_results,
            "timestamp": datetime.now().isoformat()
        }, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())