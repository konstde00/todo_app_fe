# Project Tasks Overview

This README provides an overview of the tasks completed within the current project, along with brief descriptions for each task code.

## Task List

### C1 (MVC)
- Implemented the MVC architecture for the application.
- Model: [Task](src/app/models/task.model.ts)
- View: [ListComponent](src/app/components/list/list.component.ts)
- Controller: [TaskService](src/app/services/task.service.ts)

### C2 (Cloud)
- Deployed the application to S3 bucket, using static website hosting feature.

### C3 (CI/CD)
- Created a CI/CD workflows using CircleCI.
- CircleCI configuration file is available [here](.circleci/config.yml)

### C4 (Containerisation)
- Created a [Dockerfile](Dockerfile) to build a docker image for the application.
- Command to build the image: `docker build -t todo-app-fe .`

## C9 (Integration with analytics services)
- Integrated the application with Google Analytics.
- Google Analytics configuration: [index.html](src/index.html)

### C12 (2do-list)
- Created a to-do list component, which is used to display the list of tasks.
- Component: [ListComponent](src/app/components/list/list.component.ts)

### C16 (OAuth2)
- Implemented OAuth2 authentication using Auth0.
- SocialAuthServiceConfig: [app.module.ts](src/app/app.module.ts)
- AuthenticationService: [auth.service.ts](src/app/services/authentication.service.ts)
- Component: [LoginComponent](src/app/components/login/login.component.ts)

### C19 (Static content)
- Created a user-profile page to display the user details, along with the profile picture.
- Component: [ProfileComponent](src/app/components/profile/profile.component.ts)

### F1 (Stats visualization)
- Ng2-charts library to visualize statistics about the tasks completion status.
- Component: [AnalyticsComponent](src/app/components/analytics/analytics.component.ts)

### F3 (Drag-n-drop animations)
- Angular is used to implement drag-n-drop animations for the to-do list.
- Component: [ListComponent](src/app/components/list/list.component.ts)

