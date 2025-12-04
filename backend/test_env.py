from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Test if .env is being loaded
print("🔍 Checking .env file...")
print(f"Current directory: {os.getcwd()}")
print(f"Files in directory: {os.listdir('.')}")

# Check if .env exists
if os.path.exists('.env'):
    print("✅ .env file exists")
    with open('.env', 'r') as f:
        content = f.read()
        # Hide sensitive info, just show if there's content
        if content:
            print("✅ .env file has content")
        else:
            print("❌ .env file is empty")
else:
    print("❌ .env file NOT found")

# Test specific environment variables
print(f"GROQ_API_KEY exists: {'Yes' if os.getenv('GROQ_API_KEY') else 'No'}")
print(f"NEO4J_URI exists: {'Yes' if os.getenv('NEO4J_URI') else 'No'}")
print(f"NEO4J_USERNAME exists: {'Yes' if os.getenv('NEO4J_USERNAME') else 'No'}")
# Don't print the actual password for security
print(f"NEO4J_PASSWORD exists: {'Yes' if os.getenv('NEO4J_PASSWORD') else 'No'}")

# Test Neo4j connection with explicit env vars
uri = os.getenv('NEO4J_URI')
username = os.getenv('NEO4J_USERNAME')
password = os.getenv('NEO4J_PASSWORD')

print(f"URI: {uri}")
print(f"Username: {username}")
print(f"Password: {'*' * len(password) if password else 'None'}")