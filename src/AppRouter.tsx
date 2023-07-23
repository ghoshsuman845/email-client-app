import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page404 from './containers/Page404'; 
import EmailPage from './containers/EmailPage';



function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/email-client-app" element={<EmailPage />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;