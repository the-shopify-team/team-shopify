import SearchBar from '@/components/car-catalogue/Searchbar'
import React from 'react'
import { SearchProps } from "@/types/car";
import { fetchCars } from "@/constants";
import { CarCard } from '@/components/car-catalogue/CarCard';

const page = async (props : SearchProps) => {

   // Await searchParams 
  const searchParams = await props.searchParams;

  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <div className='flex flex-col justify-center text-center py-32 max-w-7xl mx-auto'>
      <div className='text-4xl font-bold pt-20 pb-32'>
        Browse Cars Available for Rent
      </div>
      <SearchBar />
      {!isDataEmpty ? (
          <section>
            <div className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 w-full gap-10 pt-14 px-7'>
              {allCars?.map((car, index) => (
                <CarCard key={car?.id ?? index} car={car} />
              ))}
            </div>
          </section>
        ) : (
          <div className='mt-16 flex justify-center items-center flex-col gap-2'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{`Try adjusting your search criteria`}</p>
          </div>
        )}
    </div>
  )
}

export default page