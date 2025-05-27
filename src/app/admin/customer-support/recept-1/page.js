"use client";
import AdminChat from "@/components/admin-side/admin-chat";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const ReceptOne = () => {
  return (
    <div className="admin-chat-container">
      <Tabs className={"h-full flex flex-col"}>
        <TabList className={"h-auto py-8 w-full flex-center"}>
          <div className="flex gap-14">
            <Tab className={"tab-btn"}>
              <div>
                <p>CLIENTS</p>
              </div>
            </Tab>
            <Tab className={"tab-btn"}>
              <div>
                <p>customer support</p>
              </div>
            </Tab>
          </div>
        </TabList>
        <TabPanel className={"h-auto overflow-y-auto"}>
          <AdminChat isRecept={true} />
        </TabPanel>
        <TabPanel className={"h-auto overflow-y-auto"}>
          <AdminChat isRecept={true} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ReceptOne;
