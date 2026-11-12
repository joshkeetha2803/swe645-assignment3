
#Team Members: Joshitha Keetha (G01575681) & Bhuvitha Tummala (G01576792)
#Course: SWE 645
#Purpose: It establishes the connection to the AWS RDS MySQL database.

from sqlmodel import SQLModel, create_engine

# Format: mysql+pymysql://<username>:<password>@<rds-endpoint>:3306/<db_name>
# Defining the connection string for the remote database

DATABASE_URL = "mysql+pymysql://admin:xkKjVBi7p6r9PxMvxA1W@database-1.cfhpfm12kfjd.us-east-1.rds.amazonaws.com:3306/surveydb"

# Creating the SQLAlchemy engine for database interactions

engine = create_engine(DATABASE_URL, echo=True)

# Function to initialize the database schema

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)