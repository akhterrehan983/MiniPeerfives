# Mini Peerfives

Mini Peerfives allows users to reward other people with peerfives (P5) points. Users can give and receive points, track their history, and manage their rewards. The application features a user-friendly interface where users can view their balances, transaction histories, and more.

## Getting Started

To run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd mini-peerfives

2.Backend Setup:
Open a terminal and navigate to the backend directory:
cd backend
pip install -r requirements.txt  # Install required Python packages
python manage.py makemigrations          # Run database migrations
python manage.py migrate          # Run database migrations
python manage.py runserver        # Start the Django server


3.Frontend Setup:
Open a new terminal and navigate to the frontend directory:
cd frontend
npm i   # Install required Node packages
npm start     # Start the React app



Problem Statement
The application allows users to reward other users with peerfives (P5) points. The core functionalities include:

Users can give points to others.
Users can see their P5 transaction history.
Users can track their reward history.
Users can delete past transactions.
Use Cases
Person A gives 50 P5 points to Person B.
Person B gives 50 P5 points to Person A.
Person A deletes a transaction of P5.



Completed
Here are the features and tasks that have been completed:

Created a user management system.
Implemented functionality to give and receive P5 points.
Developed reward history tracking.
Designed a clean and maintainable frontend using React.
Integrated backend with Django REST framework for API management and sqlite as DB.
Ensured code quality by following best practices and using formatters/linter.
Notable Features Implemented
User List View: Displays all users and their balances.
Reward Creation: Allows users to create new rewards.
P5 History: Displays a history of P5 transactions, including the ability to delete transactions.
Reward History: Tracks rewards received by users.

Installation
To ensure the project runs smoothly, please follow the installation steps outlined in the "Getting Started" section.