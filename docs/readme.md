## Tractor marketplace

### Project Description

Tractor marketplace is a market place that enables farmers to quickly get access to qualified tractor dealers, purchase tractor and also have access to tractor spare parts. By connecting them in a securely encrypted chat environment. 

# System Flow Architecture Documentation
## Overview
This document provides a high-level overview of the system architecture, focusing on the interactions between key components. The architecture is designed to efficiently handle frontend interactions, task processing, and message queuing within a containerized environment.

## Components
- **Docker**: Utilized for containerization, ensuring consistent environments across development, testing, and production.
- **Next.js**: Serves as the frontend framework, providing server-side rendering and static site generation.
- **Celery**: Acts as the task processor, managing asynchronous tasks and background job execution.
- **CloudAMQP**: Functions as the message queue, facilitating communication between services and ensuring reliable message delivery.
## Data Flow
1. **Frontend Interactions**: 
    - Users interact with the application through the Next.js frontend.
    - Requests are processed and rendered, leveraging server-side capabilities.
2. **Task Processing**:
    - Tasks initiated by the frontend or other services are sent to Celery.
    - Celery processes these tasks asynchronously, improving system responsiveness.
3. **Message Queuing**:
    - CloudAMQP handles message queuing, ensuring tasks and data are reliably passed between services.
    - It acts as a broker between the frontend, task processor, and other components.
4. **Containerization**:
    - All components are encapsulated within Docker containers.
    - This setup ensures consistent deployment and scalability across different environments.
## Security Considerations
- **Access Control**: 
    - Implement strict access controls to secure communication between components.
    - Ensure that only authorized services and users can interact with the system.
## Diagram
Find the system architecture diagram [here](./assets/system_architecture_flow.png)

## Maintenance
- **Update Frequency**: The documentation and system flow diagram should be reviewed and updated annually to reflect any architectural changes or improvements.

### Design

This [link](https://www.figma.com/design/5Bw1JsZGxde3yXnFm2wJ6X/Kremlin-Hackathon-Design?node-id=0-1&node-type=canvas&t=nfeRpbfGqGdWLOpG-0) contains the design that is implementd for the project.


### API Documentation

This [link](https://kremlin.share-hub.co/swagger/) contains the api documentation of the project. 

### Project structure

- `backend` : *This is directory contains the backend of the application done in Django*
 - `client` : *This directory will contain the frontend of the application done in Next*
 - `docs` : *This directory will contain the documentation of the project which is where this file is*


# Contributing

We welcome contributions from the community to enhance the tractor market place website. If you'd like to contribute, please follow our [contribution guidelines](contributing.md).

# Contact
If you have any questions or inquiries, feel free to reach out to us [here]().

Happy coding!
