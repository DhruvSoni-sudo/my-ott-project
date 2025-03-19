from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session
import os

app = Flask(__name__, template_folder='templates')  # Specify the folder explicitly

# Secret key for session management (Better to store in .env file)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "your_secret_key")
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Database setup (SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Fixed URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Password hashing setup
bcrypt = Bcrypt(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Create the tables manually
with app.app_context():
    db.create_all()

# Home page
@app.route('/')
def index():
    return render_template('index.html')

# Sign up page
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        print(request.form)  # Debug: Print the form data to the console
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Check if username or email already exists
        existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
        if existing_user:
            flash('Username or Email already exists!', 'danger')
            return redirect(url_for('signup'))

        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        flash('Account created successfully!', 'success')
        return redirect(url_for('signin'))

    return render_template('signup.html')

# Sign in page
@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password, password):
            session['user_id'] = user.id  # Store user ID in session
            print("Session Data After Login:", session)  # Debugging purpose
            flash('Logged in successfully!', 'success')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid credentials, please try again.', 'danger')
            return redirect(url_for('signin'))

    return render_template('signin.html')

# Admin Dashboard Route
@app.route('/dashboard')
def admin_dashboard():
    if 'user_id' not in session:
        flash('Please log in first.', 'warning')
        return redirect(url_for('signin'))
    return render_template('admin.html')  # Ensure admin.html is correctly loading

# Fixed: Missing return statement
@app.route('/overview')
def overview():
    return render_template('overview.html')  # Fixed return issue

@app.route('/movies')
def movies():
    return render_template('movies.html')

@app.route('/users')  # URL path
def user():
    return render_template('user.html')  # HTML file ka naam

# Logout Route
@app.route('/logout')
def logout():
    session.clear()  # Clear all session data
    print("Session Data After Logout:", session)  # Debugging purpose
    flash('Logged out successfully!', 'info')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
