"use client"

import { useState, useEffect } from "react"
import { doc, getDoc, collection, query, orderBy, onSnapshot, limit } from "firebase/firestore"
import { db } from "@/Firebase/firebase"
import { HiX, HiDownload, HiExternalLink, HiUpload, HiCamera, HiDocument, HiLink, HiPhone, HiVideoCamera, HiDotsVertical } from "react-icons/hi"

const staticUserInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    status: "Hey there! I'm using WhatsApp.",
    joinedDate: "January 2024",
    location: "New York, USA",
}

const staticSharedMedia = {
    photos: [
        { id: 1, name: "Screenshot_2024.png", url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop", type: "image", date: "Today" },
        { id: 2, name: "Profile_pic.jpg", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", type: "image", date: "Yesterday" },
        {
            id: 3,
            name: "Document_scan.png",
            url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop",
            type: "image",
            date: "2 days ago",
        },
        {
            id: 4,
            name: "Meeting_notes.jpg",
            url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&h=100&fit=crop",
            type: "image",
            date: "1 week ago",
        },
        {
            id: 5,
            name: "Design_mockup.jpg",
            url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop",
            type: "image",
            date: "1 week ago",
        },
        {
            id: 6,
            name: "Team_photo.jpg",
            url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
            type: "image",
            date: "2 weeks ago",
        },
    ],
    documents: [
        { id: 1, name: "Project_Report.pdf", size: "2.4 MB", type: "pdf", date: "Today" },
        { id: 2, name: "Budget_2024.xlsx", size: "1.8 MB", type: "excel", date: "Yesterday" },
        { id: 3, name: "Presentation.pptx", size: "5.2 MB", type: "powerpoint", date: "3 days ago" },
        { id: 4, name: "Contract.docx", size: "890 KB", type: "word", date: "1 week ago" },
        { id: 5, name: "Requirements.txt", size: "156 KB", type: "text", date: "1 week ago" },
    ],
    links: [
        { id: 1, title: "GitHub Repository", url: "https://github.com/example/repo", domain: "github.com", date: "Today" },
        { id: 2, title: "Design Mockups", url: "https://figma.com/design/123", domain: "figma.com", date: "Yesterday" },
        {
            id: 3,
            title: "API Documentation",
            url: "https://docs.example.com",
            domain: "docs.example.com",
            date: "2 days ago",
        },
        {
            id: 4,
            title: "Project Management Tool",
            url: "https://trello.com/board/123",
            domain: "trello.com",
            date: "1 week ago",
        },
    ],
}

export default function RightPane({ selectedChat, onClose, showToast }) {
    const [activeTab, setActiveTab] = useState("info")
    const [userInfo, setUserInfo] = useState(staticUserInfo)
    const [sharedMedia, setSharedMedia] = useState(staticSharedMedia)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!selectedChat?.id) {
            setUserInfo(staticUserInfo)
            setSharedMedia(staticSharedMedia)
            return
        }

        const fetchUserProfile = async () => {
            try {
                setLoading(true)
                setError(null)
                console.log("Fetching user profile for:", selectedChat.id)

                const userRef = doc(db, "users", selectedChat.id)
                const userSnap = await getDoc(userRef)

                if (userSnap.exists()) {
                    const userData = userSnap.data()
                    setUserInfo({
                        name: userData.name || selectedChat.name,
                        email: userData.email || "No email provided",
                        phone: userData.phone || "No phone provided",
                        avatar: userData.avatar || selectedChat.avatar,
                        status: userData.status || "Hey there! I'm using WhatsApp.",
                        joinedDate: userData.joinedDate ? new Date(userData.joinedDate.toDate()).toLocaleDateString() : "Unknown",
                        location: userData.location || "Unknown location",
                    })
                } else {
                    console.log("User profile not found, using static data")
                    setUserInfo({
                        ...staticUserInfo,
                        name: selectedChat.name,
                        avatar: selectedChat.avatar,
                    })
                }

                const mediaRef = collection(db, "users", selectedChat.id, "sharedMedia")
                const mediaQuery = query(mediaRef, orderBy("timestamp", "desc"), limit(20))

                const unsubscribe = onSnapshot(mediaQuery, (snapshot) => {
                    const photos = []
                    const documents = []
                    const links = []

                    snapshot.forEach((doc) => {
                        const mediaData = doc.data()
                        const mediaItem = {
                            id: doc.id,
                            name: mediaData.name || "Unknown",
                            url: mediaData.url || "",
                            type: mediaData.type || "unknown",
                            size: mediaData.size || "Unknown",
                            date: mediaData.timestamp ? new Date(mediaData.timestamp.toDate()).toLocaleDateString() : "Unknown",
                            title: mediaData.title || mediaData.name || "Unknown",
                            domain: mediaData.domain || "unknown.com",
                        }

                        if (mediaData.type === "image" || mediaData.type === "video") {
                            photos.push(mediaItem)
                        } else if (mediaData.type === "document" || mediaData.type === "pdf" || mediaData.type === "excel" || mediaData.type === "word") {
                            documents.push(mediaItem)
                        } else if (mediaData.type === "link") {
                            links.push(mediaItem)
                        }
                    })

                    console.log("Fetched shared media from Firebase:", { photos, documents, links })

                    if (photos.length > 0 || documents.length > 0 || links.length > 0) {
                        setSharedMedia({
                            photos: photos.length > 0 ? photos : staticSharedMedia.photos,
                            documents: documents.length > 0 ? documents : staticSharedMedia.documents,
                            links: links.length > 0 ? links : staticSharedMedia.links,
                        })
                    } else {
                        console.log("No shared media found, using static data")
                        setSharedMedia(staticSharedMedia)
                    }
                    setLoading(false)
                }, (error) => {
                    console.error("Error fetching shared media:", error)
                    setError(error.message)
                    setLoading(false)
                    showToast("Failed to load shared media. Using demo data.", "error")
                    setSharedMedia(staticSharedMedia)
                })

                return unsubscribe
            } catch (error) {
                console.error("Error fetching user profile:", error)
                setError(error.message)
                setLoading(false)
                showToast("Failed to load user profile. Using demo data.", "error")
                setUserInfo({
                    ...staticUserInfo,
                    name: selectedChat.name,
                    avatar: selectedChat.avatar,
                })
                setSharedMedia(staticSharedMedia)
            }
        }

        fetchUserProfile()
    }, [selectedChat?.id, showToast])

    const getFileIcon = (type) => {
        switch (type) {
            case "pdf":
                return "📄"
            case "excel":
                return "📊"
            case "powerpoint":
                return "📋"
            case "word":
                return "📝"
            case "text":
                return "📄"
            default:
                return "📄"
        }
    }

    const handleFileUpload = () => {
        showToast("File upload feature coming soon!", "info")
    }

    const tabs = [
        { id: "info", label: "Info", icon: HiDocument },
        { id: "media", label: "Media", icon: HiCamera },
        { id: "files", label: "Files", icon: HiDocument },
        { id: "links", label: "Links", icon: HiLink },
    ]

    return (
        <div className="h-full bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Contact Info</h2>
                <button
                    onClick={onClose}
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <HiX className="w-5 h-5" />
                </button>
            </div>

            <div className="p-4 lg:p-6 border-b border-gray-200 text-center bg-gray-50">
                <img
                    src={userInfo.avatar || selectedChat?.avatar || staticUserInfo.avatar}
                    alt={userInfo.name || selectedChat?.name || staticUserInfo.name}
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full mx-auto mb-3 lg:mb-4 object-cover border-4 border-white shadow-lg"
                />
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-1">{userInfo.name || selectedChat?.name || staticUserInfo.name}</h3>
                <p className="text-sm text-gray-600 mb-3 lg:mb-4">{userInfo.status}</p>
                <div className="flex justify-center space-x-2">
                    <button className="px-3 py-2 lg:px-4 lg:py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors flex items-center">
                        <HiPhone className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Call</span>
                    </button>
                    <button className="px-3 py-2 lg:px-4 lg:py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors flex items-center">
                        <HiVideoCamera className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Video</span>
                    </button>
                    <button className="px-3 py-2 lg:px-4 lg:py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors">
                        <HiDotsVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="border-b border-gray-200">
                <nav className="flex">
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-3 px-1 text-center text-sm font-medium border-b-2 transition-colors flex items-center justify-center space-x-1 ${activeTab === tab.id
                                    ? "border-green-500 text-green-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        )
                    })}
                </nav>
            </div>

            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-2"></div>
                            <p className="text-sm text-gray-500">Loading profile...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">Error loading profile</p>
                            <p className="text-xs text-gray-400">{error}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {activeTab === "info" && (
                            <div className="p-4 space-y-3 lg:space-y-4">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
                                    <p className="text-sm text-gray-900 mt-1">{userInfo.email}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</label>
                                    <p className="text-sm text-gray-900 mt-1">{userInfo.phone}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</label>
                                    <p className="text-sm text-gray-900 mt-1">{userInfo.location}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Joined</label>
                                    <p className="text-sm text-gray-900 mt-1">{userInfo.joinedDate}</p>
                                </div>
                            </div>
                        )}

                        {activeTab === "media" && (
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium text-gray-900">Photos & Videos</h4>
                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                        {sharedMedia.photos.length}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    {sharedMedia.photos.map((photo) => (
                                        <div key={photo.id} className="relative group cursor-pointer">
                                            <img
                                                src={photo.url}
                                                alt={photo.name}
                                                className="w-full h-16 lg:h-20 object-cover rounded-lg"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                                                <HiDownload className="w-4 h-4 lg:w-5 lg:h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleFileUpload}
                                    className="w-full px-4 py-3 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                                >
                                    <HiUpload className="w-4 h-4 mr-2" />
                                    Upload Media
                                </button>
                            </div>
                        )}

                        {activeTab === "files" && (
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium text-gray-900">Documents</h4>
                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                        {sharedMedia.documents.length}
                                    </span>
                                </div>
                                <div className="space-y-3 mb-6">
                                    {sharedMedia.documents.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                        >
                                            <div className="text-xl lg:text-2xl mr-3">{getFileIcon(doc.type)}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {doc.size} • {doc.date}
                                                </p>
                                            </div>
                                            <HiDownload className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleFileUpload}
                                    className="w-full px-4 py-3 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                                >
                                    <HiUpload className="w-4 h-4 mr-2" />
                                    Upload Document
                                </button>
                            </div>
                        )}

                        {activeTab === "links" && (
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium text-gray-900">Shared Links</h4>
                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                        {sharedMedia.links.length}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {sharedMedia.links.map((link) => (
                                        <div
                                            key={link.id}
                                            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-blue-600 hover:text-blue-800 truncate">{link.title}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{link.domain}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{link.date}</p>
                                                </div>
                                                <HiExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
