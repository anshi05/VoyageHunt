# Manipal Hackathon 2024 README Template

**Team Name:** Access Denied

**Problem Statement:** `<Tourism often lacks engagement and interactive experiences, leading to missed opportunities for travelers to discover unique local attractions and fully immerse themselves in local culture. Design a sophisticated gamified tourism application that motivates users to thoroughly explore their destination by earning points through uncovering hidden attractions and completing challenges and quests such as uploading photos taken from specific angles to match reference images. The application should also feature leaderboards, rewards, and integrated social sharing capabilities.
>`

## 📜 Introduction

Our project allows `<insert consumer segment>` to do A, B and C by D, E and F. We have utilised X, Y and Z technologies to do P, Q and R.

## ✨ Features

App:

-   Ultra cool feature #1
-   Pro max feature #2
-   Feature #3

Website:

-   Ultra cool feature #1
-   Pro max feature #2
-   Feature #3

## 🟢 Access

🌐 Website link: https://example.com

📱 App's APK file location: [`android/build/my-app.apk`](android/build/my-app.apk)

OR

📱 Play store link: https://play.google.com/store/apps/details?id=com.digilocker.android

## 📦 Instructions For Local Deployment With Docker (Optional)

To deploy the application locally using docker, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-team-repo/manipal-hackathon-2024.git
    cd manipal-hackathon-2024
    ```

1. Build the docker image

    ```bash
    sudo docker build -t hackathon .
    ```

1. Start a container using the built image and expose necessary ports

    ```bash
    sudo docker run -it --rm -p 3000:3000 hackathon
    ```

1. Access the application at http://localhost:3000

## ⚙️ Instructions For Local Deployment Without Docker

```
Python version: 3.10

Operating system: Ubuntu 22
```

Follow these steps to run the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-team-repo/manipal-hackathon-2024.git
    cd manipal-hackathon-2024
    ```

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
