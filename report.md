# Project Report

## Project Name
Kremlin Tractor Market Place

## Team Members
- Carey Mercy - UI/UX Designer
- Collins Omondi - Front-end
- Gabriel Okemwa - Backend
- Emmanuel Kimutai - UI/UX

## Tech Stack
- Django
- Next.js
- RabbitMQ (CloudAMQP)
- Celery
- Docker

## Key Features
- **Homepage**: User-friendly showcase of featured listings with filters (price, location, brand).
- **User Registration**: Secure registration with email, phone, and social media verification.
- **Tractor Listings**: Create detailed listings with photos, specifications, history, and price.
- **Search & Filters**: Enable filtering by make, model, price, and location.
- **Messaging System**: Facilitate direct communication between buyers and sellers.
- **Seller Dashboard**: Track listing performance, inquiries, and sales.
- **Admin Panel**: Manage listings, approve content, and ensure platform quality.

## Challenges
- **Integrating Real-time Messaging**: Ensuring real-time communication between buyers and sellers was challenging. We used RabbitMQ for message brokering and Celery for background tasks, which improved performance and reliability.
- **Scalability**: Managing a growing number of listings and user interactions required scalable solutions. Docker helped in containerizing the application for consistent deployment across environments.
- **User Authentication**: Implementing secure and robust user authentication was critical. We used Django's built-in authentication mechanisms along with additional verification steps for email and phone.

## Lessons Learned
- **Effective Communication**: Regular team meetings and clear communication channels were essential for coordinating efforts and resolving issues promptly.
- **Importance of Testing**: Comprehensive testing, including unit and integration tests, helped in identifying and fixing bugs early in the development process.
- **Scalability Considerations**: Planning for scalability from the start, including the use of Docker, message brokering systems like RabbitMQ, and Celery for asynchronous tasks, proved to be crucial as the application grew. Using hosted RabbitMQ with AMQP ensured reliable message delivery and processing, making the app fast and responsive.
- **User-Centric Design**: Focusing on UI/UX design from the beginning ensured a smooth and intuitive user experience, leading to higher user satisfaction and engagement.
