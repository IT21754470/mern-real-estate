import React from 'react'
import {useState} from 'react';
import {getStorage, uploadBytesResumable,ref} from 'firebase/storage';

import { app } from '../firebase'
  //test sara
export default function CreateListing() {
    const[files,setFiles]=useState([])
    console.log(files)
    const [images,setImages]=useState([])
    


    const handleImageSubmit=async(e)=>{
       if(files.length>0 && files.length<7){
        const promises=[]

        for(let i=0;i<files.length; i++){
            promises.push(storeImage(files[i]));

        }
       }
    };

    const storeImage=async(file)=>{
        return new Promise((resolve,reject)=>{
            const storage=getStorage(app)
            const fileName=new Date().getTime()+file.name;
            const uploadTask=uploadBytesResumable(storageRef,file)
            const storageRef = ref(storage, fileName);
            uploadTask.on(
                "state_changed",
                (error)=>{
                    reject(error);
                }
            )
        })

    }


  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>


        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4'>

                <input type="text" laceholder='name' className='border p-3 rounded-lg' id='name' maxLength='62'minLength='10'required/>
                    <textarea type='text' placeholder='description'className='border p-3 rounded-lg'id='description'required/>
                    <input type="text" laceholder='address' className='border p-3 rounded-lg' id='address' required/>

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type='checkbox'id='sale'className='w-5'/>
                            <span>sell</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox'id='rent'className='w-5'/>
                            <span>Rent</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox'id='parking spot'className='w-5'/>
                            <span>parking spot</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox'id='Furnished'className='w-5'/>
                            <span>Furnished</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox'id='Offer'className='w-5'/>
                            <span>Offer</span>
                        </div>
                    </div>




                    <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                    <input type='number' id='bedrooms' min='1' max='10' required className='p-3 border-gray-300 rounded-lg'/>

                    <p>Beds</p>
                    </div>

                    <div className='flex items-center gap-2'>
                    <input type='number' id='bathrooms' min='1' max='10' required className='p-3 border-gray-300 rounded-lg'/>

                    <p>Baths</p>
                    </div>
                    </div>
                    <div className='flex items-center gap-2'>
                    <input type='number' 
                    id='regularPrice'
                     min='1' 
                     max='10' 
                     required 
                     className='p-3 border-gray-300 rounded-lg'/>

                    <div className=''>

                    <p>Regular price</p>
                    <span className='text-xs'>($ / month)</span>

                    </div>
                    </div>

                   

                    <div className='flex items-center gap-2'>
                    <input type='number' id='discountedPrice' min='1' max='10' required className='p-3 border-gray-300 rounded-lg'/>
                    <div className='flex flex-col items-center'>

                    <p>Discounted price</p>
                    <span className='text-xs'>($ / month)</span>
                    </div></div>







                    

               
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover(max 6)</span>
                </p>
                <div className='flex gap-4'>
                <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' 
                type='file' id='images' accept='image/*' multiple/>
                <button type='button'  onClick={handleImageSubmit}className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
            </div>
            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabeled:opacity-80'>Create Listing</button>
            </div>
        



        </form>
    </main>
  )
}

