# Niclas Nordlund Photography

Live: [niclasnordlund.com](https://niclasnordlund.com)

This is the source code to Niclas Nordlund's photography website. The website showcases his photos and provides a way for potential clients to contact him. It also has a shop to sell digital copies of his photos. The website is built with HTML, CSS, and JavaScript and deployed on Google Cloud Platform. It uses App Engine to host the website + the admin panel and cloud storage buckets + cloud functions for handling photos and other assets. It is responsive and works with keyboard navigation. Purchases are handled using Stripe, and there is also a bug reporting site for users ([www.niclasnordlund.com/bug](https://www.niclasnordlund.com/bug)) that implements with GitHub issues.

## Table of Contents

-   [Niclas Nordlund Photography](#niclas-nordlund-photography)
    -   [Table of Contents](#table-of-contents)
    -   [Project Structure](#project-structure)
        -   [How everything works together](#how-everything-works-together)
    -   [How to run](#how-to-run)
    -   [Screenshots](#screenshots)
        -   [Website](#website)
    -   [What I have Learned](#what-i-have-learned)

## Project Structure

The project is structured as follows:

-   `website/` - This is the main website code built with express.js. It is hosted on Google App Engine.
    -   `public/` - Frontend code for the website.
        -   `img/` - Static images and icons.
        -   `css/` - CSS files.
        -   `scripts/` - JavaScript files.
-   `admin/` - This is the admin panel code built with express.js. It is hosted on Google App Engine.
    -   `views/` - HTML files for the admin panel.
-   `functions/` - These are functions modifying photos through Google Cloud Storage Buckets. They are hosted on Google Cloud Functions.
    -   `compressPublicPhotos` - Compresses the original photos and stores them in a public bucket.
    -   `deletePublicPhotos` - Deletes photos from the public bucket when they are deleted from the bucket with the original photos.
    -   `archivePurchasedPhotos` - Archives purchased photos and stores them in a bucket temporarely and returns a signed URL to the backend.

#### How everything works together

The website works by interacting with public storage buckets and displaying the photos in them. Niclas can upload, delete and download the photos through the admin panel. Every single showcase site on the website has it's own public storage bucket. The carousel on the home page is also loaded from it's own editable public storage bucket. The shop displays photos from it's own public storage bucket that is mirroring a private bucket with the original photos. The cloud functions compressPublicPhotos and deletePublicPhotos are responsible for keeping these buckets in sync with lower quality compressed photos displayed from the public bucket. Everything Niclas has to do is upload the full quality photos he wants to sell through the admin panel with the price embedded in the name, and the cloud functions will take care of the rest. The website reads the price from the photos in the public bucket and displays them in the shop. When a user purchases a photo, the cloud function archivePurchasedPhotos is triggered it will archive the purchased photos from the private bucket with the original photos to another private bucket where the archive is stored temporarely and a signed URL is returned to the backend. The backend then sends the signed URL in an email to the user. The archive is then deleted after a set amount of time.

## How to run

I would not recommend for anybody to use this code for their own website. It is very specific to Niclas Nordlund's needs and would require a lot of work to make it work for anybody else. Also I won't be providing any support for anybody trying to replicate this website. The reason I keep this open source is to showcase my work and to provide inspiration for others. For me this project has been a great learning experience and I hope it can be for others as well. There are many better ways to setup a project like this and I would recommend looking into those instead of trying to replicate this project. See [What I have Learned](#what-i-have-learned). If you still want to try to run this project, here is how:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file in the root directory with the variables found in `.env.sample`. When deploying to Google Cloud Platform, these variables are set in the environment variables. I am using GitHub Actions to deploy the website with GitHub Secrets as the environment variables. See `.github/workflows/deploy.yml` for more information.
4. You then need to set the correct permissions in the Google Cloud IAM. The archivePurchasedPhotos cloud functions needs the Service Account Token Creator role to be able to create signed URLs. The deployment service account needs the App Engine Admin role to be able to deploy the website and the admin panel, the Cloud Build Service Account and the Cloud Functions Developer role to be able to deploy the cloud functions, the Service Account User role to be able to impersonate the service account for the cloud functions, the Storage Object User and Storage Object Viewer roles to be able to read and write to the storage buckets. The default App Engine service account needs the Service Account Token Creator role to be able to create signed URLs in the Admin Panel.
5. To run the website or the admin panel locally, navigate to the project folder and execute `npm run dev`. You also need to setup a service account for local development and load in it's credentials using the `GOOGLE_APPLICATION_CREDENTIALS` environment variable. This service account needs these roles: Cloud Functions Developer, Cloud Functions Invoker, Storage Object User and Storage Object Viewer.
6. When I am running the website locally, I am still using the same storage buckets and cloud functions as the live website. This is because I don't want to have to upload the photos twice, and I don't think I would have to modify the cloud functions code often. This is not ideal, but it works for me. If you want to run the website locally with your own storage buckets, you need to change the bucket names in the environment variables. To use seperate cloud functions for local development you can deploy different cloud functions and link them to your seperate storage buckets.
7. To test with stripe locally for the main website you need to have the Stripe CLI, you can then run `npm run stripe` to recieve webhook requests locally and `npm run buy` to test a sucessful purchase. You need to modify the `npm run buy` script to reference your own photos.
8. It is also advisable to have the Google Cloud SDK installed to be able to deploy or modify roles and permissions using the command line.

## Screenshots

### Home
![home-min](https://github.com/michaelbrusegard/NiclasNordlundPhotography/assets/56915010/d1e87f4c-ea4c-46db-9112-2100a97acc51)

### Showcase
![showcase-min](https://github.com/michaelbrusegard/NiclasNordlundPhotography/assets/56915010/ac2e174e-e27b-4a32-ab9f-0f27e37f6f80)

### Shop
![shop-min](https://github.com/michaelbrusegard/NiclasNordlundPhotography/assets/56915010/721adb32-92cc-4ec3-b17d-2050f2ef61fe)

### Admin
![admin-min](https://github.com/michaelbrusegard/NiclasNordlundPhotography/assets/56915010/2b2cba26-eb4a-4b1b-9e7b-0c425be689b0)

## What I have Learned
