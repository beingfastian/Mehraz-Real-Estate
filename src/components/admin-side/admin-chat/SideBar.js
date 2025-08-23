'use client';

import { db } from '@/Firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Sidebar({ onSelectGroup }) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Example Firebase fetch — replace with your logic
        const fetchGroups = async () => {
            const snapshot = await getDocs(collection(db, 'groups'));
            const groupList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGroups(groupList);
        };

        fetchGroups();
    }, []);

    return (
        <div className="w-64 bg-gray-100 border-r p-4">
            <h2 className="text-lg font-semibold mb-4">Chats</h2>
            <ul className="space-y-2">
                {groups.map(group => (
                    <li
                        key={group.id}
                        className="cursor-pointer p-2 rounded hover:bg-gray-200"
                        onClick={() => onSelectGroup(group)}
                    >
                        {group.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
