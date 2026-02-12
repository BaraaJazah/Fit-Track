<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy | Your Website Name</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .header {
            background-color: #ffffff;
            padding: 20px 40px;
            display: flex;
            align-items: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }

        .logo {
            height: 50px;
            margin-right: 15px;
        }

        .site-title {
            font-size: 24px;
            font-weight: bold;
            color: #31D6D6;
        }

        .container {
            max-width: 900px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
        }

        h1,
        h2 {
            color: #31D6D6;
        }

        ul {
            padding-left: 20px;
        }

        p,
        li {
            font-size: 16px;
            line-height: 1.8;
        }

        .update-date {
            font-size: 0.9rem;
            color: #555;
            margin-bottom: 20px;
        }

        .footer {
            background-color: #f0f2f5;
            padding: 30px 20px;
            margin-top: 60px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 0.95rem;
            color: #555;
        }

        .footer-content p {
            margin: 5px 0;
        }

        .footer a {
            color: #007BFF;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>

    <div class="header">
        <!-- Replace the src with your logo URL -->
        <img src="{{ asset('build/assets/images/logo/logo.png') }}" alt="Logo" class="logo">
        <div class="site-title">Daily Calories</div>
    </div>

    <div class="container">
        <h1>Privacy Policy</h1>
        <p class="update-date"><strong>Last Updated:</strong> September 7, 2025</p>

        <p>Your privacy is important to us. This Privacy Policy explains how <strong>Daily Calories</strong> collects,
            uses,
            and protects your personal information when you use our mobile application.</p>

        <h2>1. Information We Collect</h2>
        <p>We collect limited personal information to support the functionality of the app, including:</p>
        <ul>
            <li>Basic user data you provide, such as age, weight, height, or health goals.</li>
            <li>Nutrition and dietary entries you manually input (e.g., meals, calorie intake).</li>
            <li>Technical information such as device type, OS version, and crash logs.</li>
            <li>Anonymous usage data collected via Google Analytics to help us improve the app.</li>
        </ul>
        <p>We do not collect or store sensitive medical data or financial information.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your data for the following purposes:</p>
        <ul>
            <li>To help you track and manage your diet and wellness progress.</li>
            <li>To personalize the user experience based on your preferences.</li>
            <li>To improve app performance, identify bugs, and understand user behavior through analytics.</li>
        </ul>

        <h2>3. Use of Google Analytics</h2>
        <p>We use Google Analytics to collect anonymous usage data, such as screen views, session duration, and app
            interactions. This data helps us improve app features and usability. No personally identifiable information
            is shared with Google.</p>

        <h2>4. Data Deletion by the User</h2>
        <p>You can delete all your personal data and app history at any time directly from within the app settings. Once
            deleted, the data is permanently removed and cannot be recovered.</p>

        <h2>5. No Third-Party Sharing</h2>
        <p>We do not sell, rent, or share your personal data with third parties. We may disclose information only if
            required by law.</p>

        <h2>6. Data Security</h2>
        <p>We implement reasonable technical and organizational measures to protect your personal data from unauthorized
            access, alteration, or misuse. However, no method of transmission or storage is completely secure.</p>

        <h2>7. Your Rights</h2>
        <p>You have full control over your personal data. You can:</p>
        <ul>
            <li>View your data</li>
            <li>Edit or update your information</li>
            <li>Delete your data anytime within the app</li>
        </ul>
        <p>You do not need to contact support to request deletion.</p>

        <h2>8. Data Sources</h2>
        <p>The nutritional information provided in the app is primarily sourced from the U.S. Department of Agriculture
            (USDA) FoodData Central database, along with additional approximate data from other reputable sources. We
            aggregate and format this information to support the app’s functionality.</p>
        <p>Please note that some nutritional data may be estimated or approximated and should be used for general
            guidance only.</p>

        <h2>9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted within the app and/or on our
            website along with the updated revision date. Continued use of the app after changes indicates your
            acceptance.</p>

        <h2>10. Contact Us</h2>
        <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at: <a
                style=color:#31D6D6 href="mailto:dailycaloriesapps@gmail.com">dailycaloriesapps@gmail.com</a></p>
    </div>

    <footer class="footer">
        <div class="footer-content">
            <p>&copy; 2025 <strong>Daily Calories</strong>. All rights reserved.</p>
            <p>
                <a href="mailto:dailycaloriesapps@gmail.com">Contact Support</a>
            </p>
        </div>
    </footer>

</body>

</html>
