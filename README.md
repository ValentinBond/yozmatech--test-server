## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/
cd music-api
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env` file in the root directory. Use `.env.example` as example:

### **4️⃣ Run MongoDB with Docker Compose**

Use the `docker-compose.yml` file to set up MongoDB:

```sh
docker-compose up -d
```

### **5️⃣ Seed the Database**

Populate MongoDB with 50 songs:

```sh
npm run seed
```

### **6️⃣ Start the Server**

```sh
npm run dev
```

express server
contains two main modules

1. authorization module responsible for user creation and authorization
2. songs module is responsible for providing the list of songs and the possibility to add songs to your favorite list.
