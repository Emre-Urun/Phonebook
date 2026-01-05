# 📇 Phonebook Application

A modern, full-featured contact management application built with React, Redux Toolkit, and Material-UI. This application allows users to securely manage their personal contacts with a beautiful, responsive interface.

![Phonebook App](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.5.0-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-6.3.0-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🌟 Features

### 🔐 Authentication & Authorization
- **User Registration** - Create a new account with name, email, and password
- **User Login** - Secure login with JWT token authentication
- **Auto Login** - Persistent sessions using Redux Persist
- **Protected Routes** - Private routes for authenticated users only
- **Logout** - Secure logout with token cleanup

### 📱 Contact Management
- **Add Contacts** - Create new contacts with name and phone number
- **View Contacts** - Display all contacts in a clean, card-based layout
- **Search Contacts** - Real-time filtering by contact name
- **Delete Contacts** - Remove contacts with confirmation toast
- **Click-to-Call** - Tap phone numbers to initiate calls on mobile devices
- **Duplicate Prevention** - Automatic detection of duplicate contact names

### 🎨 User Interface
- **Modern Design** - Beautiful gradient backgrounds and Material-UI components
- **Responsive Layout** - Fully optimized for mobile, tablet, and desktop
- **Loading States** - Professional loading spinners for all async operations
- **Toast Notifications** - Real-time feedback for user actions
- **Form Validation** - Client-side validation with Formik and Yup
- **Smooth Animations** - Fade-in, hover effects, and transitions

### 🚀 Technical Features
- **Code Splitting** - Lazy loading for optimal performance
- **State Management** - Redux Toolkit with organized slice architecture
- **API Integration** - RESTful API with JWT authentication
- **Error Handling** - Comprehensive error handling with user-friendly messages
- **Type Safety** - Structured validation schemas

## 🛠️ Technologies

### Frontend
- **React 18.3.1** - Modern React with hooks
- **Redux Toolkit 2.5.0** - State management
- **Redux Persist 6.0.0** - Persistent state storage
- **React Router 7.1.3** - Client-side routing
- **Material-UI 6.3.0** - Component library
- **Formik 2.4.6** - Form management
- **Yup 1.6.1** - Schema validation

### Build Tools
- **Vite 6.0.5** - Fast build tool and dev server
- **ESLint** - Code quality and consistency

### Utilities
- **Axios 1.7.9** - HTTP client
- **React Hot Toast 2.4.1** - Toast notifications
- **React Spinners 0.15.0** - Loading indicators

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Emre-Urun/Phonebook.git
cd phonebook-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 🏗️ Project Structure
```
phonebook-app/
├── src/
│   ├── components/          # React components
│   │   ├── App.jsx         # Main app component with routing
│   │   ├── AppBar/         # Navigation bar
│   │   ├── AuthNav/        # Auth navigation (Login/Register)
│   │   ├── Contact/        # Single contact card
│   │   ├── ContactForm/    # Add contact form
│   │   ├── ContactList/    # Contact list container
│   │   ├── Layout/         # Page layout wrapper
│   │   ├── LoginForm/      # Login form
│   │   ├── Navigation/     # Main navigation
│   │   ├── PrivateRoute/   # Protected route wrapper
│   │   ├── RegistrationForm/ # Registration form
│   │   ├── RestrictedRoute/  # Guest-only route wrapper
│   │   ├── SearchBox/      # Contact search input
│   │   └── UserMenu/       # User menu with logout
│   ├── pages/              # Page components
│   │   ├── HomePage/       # Landing page
│   │   ├── LoginPage/      # Login page
│   │   ├── RegistrationPage/ # Registration page
│   │   └── ContactsPage/   # Contacts management page
│   ├── redux/              # Redux store configuration
│   │   ├── auth/           # Authentication slice
│   │   │   ├── slice.js
│   │   │   ├── operations.js
│   │   │   └── selectors.js
│   │   ├── contacts/       # Contacts slice
│   │   │   ├── slice.js
│   │   │   ├── operations.js
│   │   │   └── selectors.js
│   │   ├── filters/        # Filters slice
│   │   │   ├── slice.js
│   │   │   └── selectors.js
│   │   └── store.js        # Redux store with persist config
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment config
└── package.json            # Dependencies and scripts
```

## 🔑 API Endpoints

The application uses the following API endpoints:

### Authentication
- `POST /users/signup` - Register new user
- `POST /users/login` - Login user
- `POST /users/logout` - Logout user
- `GET /users/current` - Get current user info

### Contacts
- `GET /contacts` - Get all contacts
- `POST /contacts` - Create new contact
- `DELETE /contacts/:id` - Delete contact

**API Base URL:** `https://connections-api.goit.global`

## 🎨 Screenshots

### Home Page
(<img width="1902" height="986" alt="contacts-page" src="https://github.com/user-attachments/assets/3979737b-5de0-44e3-8280-1783b2e0a215" />
<img width="1900" height="988" alt="login-page" src="https://github.com/user-attachments/assets/8fa19b7c-fd18-4d7d-9330-22e5b91a74f4" />
<img width="1900" height="986" alt="home-page" src="https://github.com/user-attachments/assets/7066f028-be39-4bcd-8aed-621c2644b0d1" />
)

### Login Page
(<img width="1900" height="986" alt="home-page" src="https://github.com/user-attachments/assets/953707bd-4920-4495-97fa-d2218dc6868d" />
<img width="1902" height="986" alt="contacts-page" src="https://github.com/user-attachments/assets/5ea21186-7f18-4368-870d-cdb5be04d147" />
<img width="1900" height="988" alt="login-page" src="https://github.com/user-attachments/assets/0580988c-8c8b-4b79-880f-aa7132c9fede" />
)

### Contacts Page
(<img width="1900" height="988" alt="login-page" src="https://github.com/user-attachments/assets/c27bd57a-e333-4a7e-83d3-b8549dd81be7" />
<img width="1900" height="986" alt="home-page" src="https://github.com/user-attachments/assets/3bcd863a-a631-4ba2-9614-7c1138d85b97" />
<img width="1902" height="986" alt="contacts-page" src="https://github.com/user-attachments/assets/d985d8a7-6e51-47a0-ba7e-59214a6a4f57" />
)

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository

3. **Configure Build Settings**
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

4. **Deploy**
- Click "Deploy"
- Wait for deployment to complete
- Your app is live! 🎉

### Other Platforms

#### Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

#### GitHub Pages
```bash
npm run build
# Follow GitHub Pages deployment guide
```

## 📝 Available Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Register new user
- [ ] Login with credentials
- [ ] Add new contact
- [ ] Search contacts
- [ ] Delete contact
- [ ] Click phone number (mobile)
- [ ] Logout
- [ ] Page refresh (persistent login)
- [ ] Direct URL access to protected routes
- [ ] Responsive design on different devices

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Emre Ürün**

- GitHub: [@Emre-Urun](https://github.com/Emre-Urun)
- LinkedIn: [@emre-ürün](https://www.linkedin.com/in/emre-%C3%BCr%C3%BCn-944b4735b/)
- Email: emrern268@gmail.com

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) - For the beautiful component library
- [Redux Toolkit](https://redux-toolkit.js.org/) - For simplified Redux development
- [React Hot Toast](https://react-hot-toast.com/) - For elegant notifications

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Material-UI Documentation](https://mui.com/)
- [Formik Documentation](https://formik.org/)
- [React Router Documentation](https://reactrouter.com/)

---

⭐ If you found this project helpful, please give it a star!

Made with ❤️ and React
