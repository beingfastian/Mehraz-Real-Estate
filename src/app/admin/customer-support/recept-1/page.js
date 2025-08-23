"use client";
import AdminChat from "@/components/admin-side/admin-chat/index.js";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const ReceptOne = () => {
  return (
    <div className="">
      <Tabs className={"h-full flex flex-col"}>
        <TabList className={"h-auto py-4 w-full flex-center border-b border-gray-200 bg-gray-50"}>
          <div className="flex gap-14">
            <Tab className={"tab-btn px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"}>
              <div>
                <p className="font-medium">CLIENTS</p>
              </div>
            </Tab>
            <Tab className={"tab-btn px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"}>
              <div>
                <p className="font-medium">customer support</p>
              </div>
            </Tab>
          </div>
        </TabList>
        <TabPanel className={"h-full overflow-hidden"}>
          <AdminChat isRecept={true} />
        </TabPanel>
        <TabPanel className={"h-full overflow-hidden"}>
          <AdminChat isRecept={true} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ReceptOne;
