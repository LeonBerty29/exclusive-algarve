import React from 'react'
import { BiArea } from "react-icons/bi";
import { MdOutlineLocalHotel, MdOutlineShower, MdOutlinePool } from "react-icons/md";
import { BsTextarea } from "react-icons/bs";
import { Separator } from '@/components/ui/separator'




export const PropertyInfo = () => {


  const constructionYear = `2024`
  const features = {
    bedrooms: 3,
    bathrooms: 2,
    privateArea: 100,
    grossArea: 203,
    poolLength: 3
  }


  return (
    <>
      <div className='flex gap-6'>
        <div className='flex-1 flex gap-12 flex-wrap'>
          {
            features.bedrooms && (
              <div className='flex gap-3'>
                <MdOutlineLocalHotel className='h-8 w-8' />
                <div>
                  <p className='text-sm font-semibold'>{features.bedrooms}</p>
                  <p className='text-xs text-gray-600'>Bedrooms</p>
                </div>
              </div>
            )
          }
          {
            features.bathrooms && (
              <div className='flex gap-3'>
                <MdOutlineShower className='h-8 w-8' />
                <div>
                  <p className='text-sm font-semibold'>{features.bathrooms}</p>
                  <p className='text-xs text-gray-600'>Bathrooms</p>
                </div>
              </div>
            )
          }
          {
            features.privateArea && (
              <div className='flex gap-3'>
                <BiArea className='h-8 w-8' />
                <div>
                  <p className='text-sm font-semibold'>{features.privateArea} m<sup>2</sup></p>
                  <p className='text-xs text-gray-600'>Private Area</p>
                </div>
              </div>
            )
          }
          {
            features.grossArea && (
              <div className='flex gap-3'>
                <BsTextarea className='h-8 w-8' />
                <div>
                  <p className='text-sm font-semibold'>{features.grossArea} m<sup>2</sup></p>
                  <p className='text-xs text-gray-600'>Gross Area</p>
                </div>
              </div>
            )
          }
          {
            features.grossArea && (
              <div className='flex gap-3'>
                <MdOutlinePool className='h-8 w-8' />
                <div>
                  <p className='text-sm font-semibold'>{features.grossArea} mtrs</p>
                  <p className='text-xs text-gray-600'>Pool</p>
                </div>
              </div>
            )
          }




        </div>
        <div>
          <h2 className='text-lg font-bold text-right'>{constructionYear}</h2>
          <p className='text-xs text-gray-500 text-right'>Construction Year</p>
        </div>
      </div>


      <Separator className='mt-7 bg-gray-300'  />
    </>
  )
}



