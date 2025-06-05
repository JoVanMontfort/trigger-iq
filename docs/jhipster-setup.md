### 🧪 Prerequisites

Before you begin:
- Node.js (v16 or higher)
- npm or yarn
- Java 17+
- Docker (optional, for DB and container builds)
- Yeoman & JHipster CLI:

```bash
npm install -g generator-jhipster
```
### ⚙️ Step 1: Generate the JHipster App
```bash
mkdir triggeriq-landing
cd triggeriq-landing
jhipster
```

#### **Use the following prompts:**
| Question                                                                  | Your Answer                                                  |
| ------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Which type of application would you like to create?                       | **Monolithic application (recommended for simple projects)** |
| What is the base name of your application?                                | `triggeriq`                                                  |
| What is your default package name?                                        | `com.triggeriq.app`                                          |
| Which type of authentication would you like to use?                       | `JWT authentication (stateless, with a token)`               |
| Which type of database would you like to use?                             | `PostgreSQL`                                                 |
| Do you want to use the Spring cache abstraction?                          | `No`                                                         |
| Would you like to use Elasticsearch?                                      | `No`                                                         |
| Would you like to use the Apache Kafka message broker?                    | `No`                                                         |
| Which other technologies would you like to use?                           | (spacebar to select) `Angular`                               |
| Would you like to generate the admin UI?                                  | `Yes`                                                        |
| Would you like to enable internationalization support?                    | `Yes` (select English)                                       |
| Which testing frameworks would you like to use?                           | `Cypress` for e2e                                            |
| Other options                                                             | `No` to all for now                                          |
| Would you like to install other generators from the JHipster Marketplace? | `No`                                                         |

### 📁 Step 2: Customize the Landing Page
#### **Location:**
Modify src/main/webapp/app/home:
- Replace or extend the default home.component.html with your landing page structure (based on our earlier HTML template).
- Add jQuery if needed via angular.json:

```json
"scripts": [
"node_modules/jquery/dist/jquery.min.js"
]
```

#### **Tailwind Setup (optional):**
Install Tailwind for better styling control.
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```
Update your src/main/webapp/content/css/global.css and enable Tailwind in webpack.config.js.

### 🧪 Step 3: Run the App
```bash
./mvnw
```
Access the app on:\
📍 http://localhost:8080

### 📦 Optional Enhancements
- Add static landing content for /home route
- Add user registration -> “Request a Demo” CTA can redirect to registration
- Create a custom landing component if separating from logged-in users

### 🧾 Summary
| Feature        | Stack                       |
| -------------- | --------------------------- |
| Backend        | Java 17 + Spring Boot       |
| Frontend       | Angular + (optional) jQuery |
| Styling        | Tailwind CSS (optional)     |
| Authentication | JWT                         |
| Database       | PostgreSQL                  |
| Admin Panel    | Included                    |
| Deployment     | Docker, Heroku, or CI/CD    |
