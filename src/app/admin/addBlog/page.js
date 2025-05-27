'use client';

import React,{ useState } from 'react';
import { FiTrash, FiEdit2 } from 'react-icons/fi';
import {

  FaChevronLeft,
  
} from "react-icons/fa";
import Image from 'next/image';

const AddBlogs = () => {


  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);

  const handleEditClick = (row) => {
    setCurrentRowData(row);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (row) => {
    setCurrentRowData(row);
    setDeleteModalOpen(true);
  };

  const closeModals = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setCurrentRowData(null);
  };

  const rows = [
    {
      title: 'Example Title',
      description: 'Example Description',
      image: 'http://surl.li/ldoxxk',
      caption: 'Example Caption',
      date: '01-01-2024',
    },
    {
      title: 'Smamose Description',
      description:  "Example Description",
      image: 'http://surl.li/nyduhl',
      caption: 'Example Caption',
      date: '01-01-2024',
    },
    {
      title: 'Example Title',
      description: 'Example Description',
      image: 'http://surl.li/kquvik',
      caption: 'Example Caption',
      date: '01-01-2024',
    },
    {
      title: 'Example Title',
      description: 'Example Description',
      image: 'http://surl.li/wmtzxq',
      caption: 'Example Caption',
      date: '01-01-2024',
    },
    // Add more rows as needed
  ];

    return (
        <div className="container h-screen mx-auto p-4 overflow-y-auto ">
           <h1 className="text-2xl font-bold mb-4 text-center ">BLOG</h1>
           <button
                              
                              className=" mr-5 transform -translate-y-1/2 text-black bg-[#b0b0b0]  p-3 rounded-full shadow-lg z-10 sm:-translate-x-6"
                            >
                              <FaChevronLeft  />
                            </button>
            <div className="flex flex-col   space-y-4">
                {/* First Row */}
               
                <div className="flex w-full md:flex-wrap space-x-4 ">
                    {/* Main Content 60% */}
                    <div className="w-full border-dotted overflow-y-auto border-2 border-gray-400 p-4">
  <table className="w-full table-auto">
    <thead>
      <tr>
        <th className="p-2 border-b border-r border-gray-400">TITLE</th>
        <th className="p-2 border-b border-r border-gray-400">DESCRIPTION</th>
        <th className="p-2 border-b border-r border-gray-400">IMAGE</th>
        <th className="p-2 border-b border-r border-gray-400">CAPTION</th>
        <th className="p-2 border-b border-r border-gray-400">DATE</th>
        <th className="p-2 border-b border-r border-gray-400">Action</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>
          <td className="p-2 border-b border-r border-gray-400">{row.title}</td>
          <td className="p-2 border-b border-r border-gray-400">{row.description}</td>
          <td className="p-2 border-b border-r underline border-gray-400">{row.image}</td>
          <td className="p-2 border-b border-r border-gray-400">{row.caption}</td>
          <td className="p-2 border-b border-r border-gray-400">{row.date}</td>
          <td className="p-2 border-b border-r border-gray-400">
            <div className="flex cursor-pointer gap-2">
              <button
                className="cursor-pointer text-red-500"
                onClick={() => handleDeleteClick(row)}
              >
                <FiTrash />
              </button>
              <button
                className="cursor-pointer text-green-500"
                onClick={() => handleEditClick(row)}
              >
                <FiEdit2 />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Edit Modal */}
  {isEditModalOpen && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full overflow-auto">
        <h2 className="text-xl font-bold mb-4">Edit Data</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Title:</p>
            <p>{currentRowData?.title}</p>
          </div>
          <div>
            <p className="font-bold">Description:</p>
            <p>{currentRowData?.description}</p>
          </div>
          <div>
            <p className="font-bold">Image:</p>
            <Image
              fill
              src={currentRowData?.image}
              alt="Selected"
              className="w-full h-auto object-cover border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <p className="font-bold">Caption:</p>
            <p>{currentRowData?.caption}</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-green-500 text-white py-2 px-6 rounded mr-4"
            onClick={closeModals}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-6 rounded"
            onClick={closeModals}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}

{isDeleteModalOpen && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full overflow-auto">
        <h2 className="text-xl font-bold mb-4">Delete Data</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Title:</p>
            <p>{currentRowData?.title}</p>
          </div>
          <div>
            <p className="font-bold">Description:</p>
            <p>{currentRowData?.description}</p>
          </div>
          <div>
            <p className="font-bold">Image:</p>
            <Image
              fill
              src={currentRowData?.image}
              alt="Selected"
              className="w-full h-auto object-cover border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <p className="font-bold">Caption:</p>
            <p>{currentRowData?.caption}</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 text-white py-2 px-6 rounded"
            onClick={closeModals}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-6 rounded"
            onClick={closeModals}
          >
            Cancel
          </button>
        </div>
        </div>
      </div>
    </div>
  )}

  {/* Delete Modal */}
  {/* {isDeleteModalOpen && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Title:</p>
            <p>{currentRowData?.title}</p>
          </div>
          <div>
            <p className="font-bold">Description:</p>
            <p>{currentRowData?.description}</p>
          </div>
          <div>
            <p className="font-bold">Image:</p>
            <img
              src={currentRowData?.image}
              alt="Selected"
              className="w-full h-auto object-cover border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <p className="font-bold">Caption:</p>
            <p>{currentRowData?.caption}</p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 text-white py-2 px-6 rounded"
            onClick={closeModals}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-6 rounded"
            onClick={closeModals}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )} */}
</div>


                    {/* Selected Blog 40% */}
                    <div className="w-full md:mt-5  overflow-y-auto text-center border-dotted border-2 border-gray-400 p-4">
                    <h1 className='font-bold' >Selected Blog</h1>
                    <table className="w-full table-auto border-collapse">
    <thead>
        <tr>
            <th className="p-2 border-b-2 border-gray-400  ">COMMENTS</th>
            <th className="p-2 border-b-2 border-gray-400">ACTION</th>
        </tr>
    </thead>
    <tbody>
        {/* Repeat for each comment entry */}
        <tr>
            <td className="p-2 border-b border-r border-gray-400">Example Comment</td>
            <td className="p-2 border-b border-gray-400">
                <button className="text-gray-500 underline mr-2">RESPOND</button>
                <button className="text-red-500"><FiTrash /></button>
            </td>
            
        </tr>
        <tr>
            <td className="p-2 border-b border-r border-gray-400">Example Comment</td>
            <td className="p-2 border-b border-gray-400">
                <button className="text-gray-500 underline mr-2">RESPOND</button>
                <button className="text-red-500"><FiTrash /></button>
            </td>
            
        </tr>
        <tr>
            <td className="p-2 border-b border-r border-gray-400">Example Comment</td>
            <td className="p-2 border-b border-gray-400">
                <button className="text-gray-500  underline mr-2">RESPOND</button>
                <button className="text-red-500"><FiTrash /></button>
            </td>
            
        </tr>
        {/* Add more rows as needed */}
    </tbody>
</table>

                    </div>
                </div>

                {/* Second Row */}
                <div className="flex w-full  md:flex-wrap space-x-4">
                    {/* Add New Blog 60% */}
                    <div className="border-dotted flex-wrap overflow-y-auto  border-2 border-gray-400 p-4">
  <h2 className="text-lg font-bold mb-4">Add New Blog</h2>

  {/* Row for inputs */}
  <div className="flex md:flex-col flex-wrap overflow-y-auto gap-4">
    {/* Left Section: Title, Category, Images, and Keywords */}
    <div className="flex-1 overflow-y-auto">
      {/* Title */}
      <div className="mb-4">
        <label className="block font-medium mb-1">TITLE</label>
        <input
          type="text"
          className="border border-gray-400 p-2 rounded-md w-full lg:w-[300px]"
          placeholder="Enter here..."
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Category</label>
        <select className="border text-center border-gray-400 p-2 rounded-lg w-full lg:w-[300px]">
          <option value="">Select</option>
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
          <option value="3">Category 3</option>
          <option value="4">Category 4</option>
          <option value="5">Category 5</option>
        </select>
      </div>

      {/* Images and Keywords */}
      <div className="flex gap-4">
        {/* Images */}
        <div className="flex-1">
          <label className="block font-medium mb-1">IMAGES (MAX 4)</label>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative mb-2">
              <input
                type="file"
                className="hidden"
                id={`file-input-${i}`}
              />
              <label
                htmlFor={`file-input-${i}`}
                className="block border border-gray-400  text-center rounded-full cursor-pointer w-full lg:w-[300px] text-gray-600"
              >
                Attach File
              </label>
            </div>
          ))}
        </div>

        {/* Keywords */}
        <div className="flex-1">
          <label className=" font-medium mb-1">KEYWORDS</label>
          {[...Array(4)].map((_, i) => (
            
            <input
              key={i}
              type="text"
              className="border  h-6 mt-2 gap-2 border-gray-400 w-full lg:w-[300px]  rounded-full"
              placeholder=""
            />
          ))}
        </div>
      </div>
    </div>

    {/* Right Section: Full Description */}
    <div className="flex-1 w-full  ">
      <label className="block font-bold mb-1">DESCRIPTION</label>
      <textarea
        className="border border-gray-400 p-2 w-full h-[250px] rounded-lg"
        placeholder="Enter description here..."
      ></textarea>
     <div className="mt-4">
        <button className="bg-black  text-white py-2 px-6 rounded-full">
          ADD NEW BLOG
        </button>
      </div>
    </div>
    
  </div>
</div>



                    {/* Categories 40% */}
                    
                    <div className="w-full rounded-md   md:mt-5   h-[200px]  p-4">
                      
                        <ul className='border-solid border-2 border-gray-400'>
                      <p className="text-lg font-bold mb-2">Categories</p>
                            <li className=" border-b  border-gray-400 p-2">ALL</li>
                            <li className=" border-b  border-gray-400 p-2">Category 1</li>
                            <li className=" border-b border-gray-400 p-2">Category 2</li>
                        </ul>
                        
                         <input type='text' placeholder='User give the category....' />
                        <button className="bg-black ml-3  mt-5 text-white py-2 px-6 rounded-full">
          ADD NEW Category
        </button>
                    </div>
                   
                    
                </div>
              
            </div>
        </div>
    );
}

export default AddBlogs;
