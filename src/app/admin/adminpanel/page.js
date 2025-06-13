"use client";
import { useState } from "react";

export default function AdminDashboard() {
  const [uploadsOpen, setUploadsOpen] = useState(true);
  const [groupChatsOpen, setGroupChatsOpen] = useState(true);
  const [membersOpen, setMembersOpen] = useState(true);
  const [teamsOpen, setTeamsOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const MenuGroup = ({ title, children, open, setOpen }) => (
    <div className="w-full mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-lg font-bold flex justify-between items-center w-full px-4 py-2 hover:bg-gray-100 rounded transition-colors">
        {title}
        <span className="text-xs">{open ? "▲" : "▼"}</span>
      </button>
      <div className={`pl-4 pt-2 ${open ? "block" : "hidden"}`}>{children}</div>
    </div>
  );

  const MenuItem = ({ label, onClick }) => (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 my-1 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm font-semibold text-left transition-colors">
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile menu button (always visible on mobile) */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white border-b">
        <h2 className="text-lg font-bold">MEHRAZ</h2>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl focus:outline-none"
          aria-label="Toggle menu">
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white p-4 w-full md:w-64 lg:w-72 border-r fixed md:static h-full z-10 ${
          menuOpen ? "block" : "hidden"
        } md:block`}>
        <div className="space-y-4">
          <MenuGroup
            title="UPLOADS"
            open={uploadsOpen}
            setOpen={setUploadsOpen}>
            <MenuItem label="PROJECTS" />
            <MenuItem label="BLOGS" />
            <MenuItem label="CUSTOM RATES" />
            <MenuItem label="PRODUCT RATES" />
            <MenuItem label="MATERIALS, PROPERTY" />
          </MenuGroup>

          <MenuGroup
            title="GROUPCHATS"
            open={groupChatsOpen}
            setOpen={setGroupChatsOpen}>
            <MenuItem label="CLIENT GROUPS" />
            <MenuItem label="CUSTOMER SUPPORT" />
          </MenuGroup>

          <MenuGroup
            title="MEMBERS"
            open={membersOpen}
            setOpen={setMembersOpen}>
            <MenuItem label="CLIENTS" />
            <MenuItem label="USERS" />
          </MenuGroup>

          <MenuGroup
            title="TEAMS & OTHERS"
            open={teamsOpen}
            setOpen={setTeamsOpen}>
            <MenuItem label="ROLES, ANALYTICS & CITIES" />
            <MenuItem label="TEAM, ABOUT US & BANNERS" />
            <MenuItem label="CALLS, MEETUP" />
          </MenuGroup>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 flex items-center justify-center md:ml-64 lg:ml-72 mt-16 md:mt-0">
        <h1 className="text-2xl font-bold uppercase text-center">
          Welcome Back to Dashboard
        </h1>
      </main>
    </div>
  );
}
