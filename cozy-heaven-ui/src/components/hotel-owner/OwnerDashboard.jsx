import React, { useState, useEffect } from 'react';
import './styles.css';


// // Import Tab Content Components
// import DashboardContent from './tabs/DashboardContent';
// import BookingsContent from './tabs/BookingsContent';
// import ReviewsContent from './tabs/ReviewsContent';
// import RevenueContent from './tabs/RevenueContent';
// import MyHotelsContent from './tabs/MyHotelsContent';
// import AddEditHotelContent from './tabs/AddEditHotelContent';
// import PendingRequestsContent from './tabs/PendingRequestsContent';
// import CancellationsContent from './tabs/CancellationsContent';
// import ProfileContent from './tabs/ProfileContent';
// import SettingsContent from './tabs/SettingsContent';

// // Import Modals
// import ViewDetailsModal from './modals/ViewDetailsModal';
// import DeleteModal from './modals/DeleteModal';
// import SuccessModal from './modals/SuccessModal';
// import ConfirmationModal from './modals/ConfirmationModal';

function OwnerDashboard() {
    const [activeTab, setActiveTab] = useState(() => {
        const hash = window.location.hash.substring(1);
        const validTabs = ['dashboard', 'bookings', 'reviews', 'revenue', 'my-hotels', 'add-hotel', 'requests', 'cancellations', 'profile', 'settings'];
        return validTabs.includes(hash) ? hash : 'dashboard';
    });
    const [pageTitle, setPageTitle] = useState('Dashboard'); // Initial Title

    const ownerData = {
        name: "Hotel Owner",
        email: "owner@cozyheaven.com",
        initials: "HO" // Used for avatar fallback
    };

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: 'fa-tachometer-alt' },
        { id: 'bookings', label: 'Bookings', icon: 'fa-calendar-check' },
        { id: 'reviews', label: 'Reviews', icon: 'fa-star' },
        { id: 'revenue', label: 'Revenue', icon: 'fa-chart-line' },
        { id: 'my-hotels', label: 'My Hotels', icon: 'fa-hotel' },
        { id: 'add-hotel', label: 'Add/Edit Hotel', icon: 'fa-plus-circle' },
        { id: 'requests', label: 'Pending Requests', icon: 'fa-hourglass-half' },
        { id: 'cancellations', label: 'Cancellations', icon: 'fa-times-circle' },
        { id: 'profile', label: 'My Profile', icon: 'fa-user-circle' },
        { id: 'settings', label: 'Settings', icon: 'fa-cog' },
    ];

    const handleTabClick = (tabId) => {
        const newTitle = tabs.find(t => t.id === tabId)?.label || 'Dashboard';
        setActiveTab(tabId);
        setPageTitle(newTitle);
        if (window.location.hash !== `#${tabId}`) {
             window.location.hash = tabId;
        }
    };

    useEffect(() => {
        const currentTitle = tabs.find(t => t.id === activeTab)?.label || 'Dashboard';
        setPageTitle(currentTitle);
        // You might need to manually trigger Bootstrap dropdown/modal JS initialization
        // if components remount fully, or handle state internally.
        // Example: const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
        // const dropdownList = dropdownElementList.map(el => new window.bootstrap.Dropdown(el));
    }, [activeTab, tabs]); // tabs included in dependency array

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            const validTabs = tabs.map(t => t.id);
            if (validTabs.includes(hash) && hash !== activeTab) { // Prevent infinite loops
                 setActiveTab(hash);
            } else if (!hash && activeTab !== 'dashboard') {
                setActiveTab('dashboard'); // Default to dashboard if hash is empty
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Initial check in case loaded with a hash
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [activeTab, tabs]); // activeTab added dependency

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardContent />;
            case 'bookings': return <BookingsContent />;
            case 'reviews': return <ReviewsContent />;
            case 'revenue': return <RevenueContent />;
            case 'my-hotels': return <MyHotelsContent />;
            case 'add-hotel': return <AddEditHotelContent />;
            case 'requests': return <PendingRequestsContent />;
            case 'cancellations': return <CancellationsContent />;
            case 'profile': return <ProfileContent ownerData={ownerData} />;
            case 'settings': return <SettingsContent />;
            default: return <DashboardContent />;
        }
    };

    return (
        // Body already has padding-top from styles.css or index.html <style>
        <div>
            {/* Main Navigation Header - Using styles.css classes */}
             <nav> {/* Apply nav styles from styles.css */}
                <div className="logo">Cozy Heaven</div> {/* Apply .logo styles */}
                <div className="nav-links"> {/* Apply .nav-links styles */}
                     <ul>
                        {/* Keep empty or add relevant high-level links if needed, styled by nav ul li a */}
                    </ul>
                </div>
                <div className="user-menu"> {/* Apply .user-menu styles */}
                    {/* Notification Dropdown - Structure for Bootstrap JS, styling from styles.css */}
                    <div className="dropdown">
                        <div className="notification-bell" id="notificationBell" title="Notifications" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-bell"></i>
                            <span className="notification-badge">3</span> {/* Apply .notification-badge styles */}
                        </div>
                        {/* Apply .dropdown-content styles */}
                        <div className="dropdown-menu dropdown-content notification-dropdown" aria-labelledby="notificationBell" id="notificationDropdown">
                            {/* Apply .dropdown-header styles */}
                            <div className="dropdown-header">
                                <h3>Notifications</h3>
                                <a href="#" id="markAllAsRead">Mark all as read</a>
                            </div>
                            {/* Apply .dropdown-item styles - items loaded by JS/State later */}
                             <div className="dropdown-item unread">
                                <div className="dropdown-item-icon"><i className="fas fa-check-circle"></i></div>
                                <div className="dropdown-item-content">
                                    <div className="dropdown-item-title">Hotel Approved</div>
                                    <div className="dropdown-item-message">"Sunset Paradise" approved.</div>
                                    <div className="dropdown-item-time">10 mins ago</div>
                                </div>
                             </div>
                              <div className="dropdown-item unread">
                                <div className="dropdown-item-icon"><i className="fas fa-calendar-check"></i></div>
                                <div className="dropdown-item-content">
                                    <div className="dropdown-item-title">New Booking</div>
                                    <div className="dropdown-item-message">#B1007 for Deluxe Room.</div>
                                    <div className="dropdown-item-time">15 mins ago</div>
                                </div>
                             </div>
                             {/* Apply .dropdown-footer styles */}
                             <div className="dropdown-footer">
                                <a href="#">View all notifications</a>
                            </div>
                        </div>
                    </div>

                    {/* Account Dropdown - Structure for Bootstrap JS, styling from styles.css */}
                    <div className="dropdown">
                        {/* Apply .user-avatar styles */}
                        <div className="user-avatar" id="userAvatar" title="Account Menu" data-bs-toggle="dropdown" aria-expanded="false">{ownerData.initials}</div>
                         {/* Apply .dropdown-content styles */}
                        <div className="dropdown-menu dropdown-content account-dropdown" aria-labelledby="userAvatar" id="accountDropdown">
                            {/* Apply .account-header styles */}
                            <div className="account-header">
                                <div className="account-avatar">{ownerData.initials}</div>
                                <div className="account-info">
                                    <h4 id="account-owner-name">{ownerData.name}</h4>
                                    <p id="account-owner-email">{ownerData.email}</p>
                                </div>
                            </div>
                            {/* Apply .account-menu-item styles */}
                            <a href="#profile" className="account-menu-item" onClick={(e) => { e.preventDefault(); handleTabClick('profile'); }}>
                                <i className="fas fa-user"></i> My Profile
                            </a>
                            <a href="#settings" className="account-menu-item" onClick={(e) => { e.preventDefault(); handleTabClick('settings'); }}>
                                <i className="fas fa-cog"></i> Settings
                            </a>
                            <a href="#" className="account-menu-item">
                                <i className="fas fa-life-ring"></i> Help & Support
                            </a>
                             {/* Add divider if present in styles.css or needed */}
                             <hr className='my-1' />
                            <a href="#" className="account-menu-item logout-link"> {/* Add logout logic */}
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Secondary Dashboard Navigation - Using styles.css classes */}
            <div className="dashboard-nav">
                <ul>
                    {tabs.map(tab => (
                        <li key={tab.id}>
                            <a
                                href={`#${tab.id}`}
                                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`} // .active class from styles.css
                                onClick={(e) => { e.preventDefault(); handleTabClick(tab.id); }}
                            >
                                <i className={`fas ${tab.icon} fa-fw`}></i> {tab.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area - Using styles.css container */}
            <div className="container">
                {/* Page Header - Using styles.css classes */}
                <div className="page-header">
                    <h1 id="page-title">{pageTitle}</h1>
                    <div className="breadcrumb">
                        <a href="#dashboard" onClick={(e) => { e.preventDefault(); handleTabClick('dashboard'); }}>Home</a>
                        <span className="breadcrumb-separator">/</span>
                        <span id="current-page">{pageTitle}</span>
                    </div>
                </div>

                {/* Dynamic Tab Content */}
                {/* Key forces remount on tab change if needed, otherwise remove key */}
                <div key={activeTab}>
                    {renderTabContent()}
                </div>
            </div>

            {/* Modals - Structure for Bootstrap JS, styling from styles.css */}
             <ViewDetailsModal />
             <DeleteModal />
             <SuccessModal />
             <ConfirmationModal />
        </div>
    );
}

export default OwnerDashboard;