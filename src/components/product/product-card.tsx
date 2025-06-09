import { cn } from '@/lib/utils';
import { PiCarLight } from "react-icons/pi";
import { MdOutlineShower } from "react-icons/md";
import { Play } from 'lucide-react';
import { IoMdPricetag } from "react-icons/io";
import { MdOutlineLocalHotel } from "react-icons/md";
import { Card, CardContent, CardHeader } from '../ui/card';
import ProductImageCarousel from './product-image-carousel';
import { AddToFavoriteButton, DeleteFromFavoriteButton } from '../search/submit-buttons';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { PriceFormat } from '../shared/price-format';
import { Home } from '@/types';


interface Props {
    home: Home;
}


export const ProductCard = ({ home }: Props) => {
    // const [favorite, setFavorite] = useState(false)
    const { description, imagePaths, location, price, userId, favoriteId, favorite, homeId, exclusive, tag, grossArea, plotSize, amenities, liveVideo } = home;
    const currency = "EUR";
    return (
        <Card className="flex flex-col gap-0 rounded-none p-0">
            <CardHeader className="p-0 relative">
                <ProductImageCarousel imagePaths={imagePaths} />
                <div className="z-10 absolute top-2 left-2 right-2 flex items-center justify-between gap-3">
                    {
                        <>
                            <div className='flex items-center gap-[6px]'>
                                <div className=' min-w-fit rounded-none bg-gray-200 text-black text-[10px] px-2 py-1 h-fit flex gap-2 items-center justify-center'>
                                    <IoMdPricetag fill='none' strokeWidth={20} />
                                    {homeId}
                                </div>
                                {
                                    tag && (
                                        <div className={cn('min-w-fit rounded-none text-white text-[11px] px-2 py-1 h-fit flex items-center justify-center', tag.slug === 'rsv' ? "bg-[#17BF62]" : "bg-red-700")}>{tag.name}</div>
                                    )
                                }
                            </div>

                            {
                                favorite ? (
                                    <form
                                    // action={DeleteFromFavorite}
                                    >
                                        <input type="hidden" name="favoriteId" value={favoriteId} />
                                        <input type="hidden" name="userId" value={userId} />
                                        {/* <input type="hidden" name="pathName" value={pathName} /> */}
                                        <DeleteFromFavoriteButton />
                                    </form>


                                ) : (


                                    <form
                                    // action={addToFavorite}
                                    >
                                        <input type="hidden" name="homeId" value={homeId} />
                                        <input type="hidden" name="userId" value={userId} />
                                        {/* <input type="hidden" name="pathName" value={pathName} /> */}
                                        <AddToFavoriteButton />
                                    </form>
                                )
                            }
                        </>

                    }
                </div>


                {
                    exclusive && (
                        <div className='bg-primary h-6 text-center text-xs font-bold text-white absolute bottom-0 w-full flex items-center justify-center z-10'>
                            EXCLUSIVE LISTING BY EAV
                        </div>
                    )
                }


            </CardHeader>
            <CardContent className='p-3 space-y-3'>
                <div className='flex justify-between align-center flex-wrap gap-y-2 gap-x-5'>
                    <PriceFormat amount={price} currency={currency} amountStyle="text-primary" formatAmount={false} className="gap-1 text-primary" />
                </div>


                <p className='text-neutral-700 text-sm line-clamp-2'>
                    {description}
                </p>


                <Separator className='mt-2' />


                <div className="flex flex-wrap lg:flex-nowrap justify-between gap-1">
                    <div className="w-[47%]">
                        <div>
                            <p className='text-xs font-light text-gray-400 mb-3'>Location</p>
                            <p className='text-xs font-semibold text-black'>{location}</p>
                        </div>
                    </div>


                    <div className='w-[52%] max-w-[140px] min-w[128px] flex gap-2 justify-between'>
                        <div className="flex-1 max-w-fit">
                            <p className='text-xs font-light text-gray-400 mb-3'>Gross Area</p>
                            <p className='text-xs text-black font-semibold'>{grossArea} <sup>m2</sup></p>
                        </div>
                        <div className="flex-1 max-w-fit">
                            <p className='text-xs font-light text-gray-400 mb-3'>Plot Size</p>
                            <p className='text-xs font-semibold text-black'>{plotSize} <sup>m2</sup></p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap justify-between pt-1 gap-1">
                    <div className="w-[47%]">


                        <div className='flex items-center gap-3 h-[40px]'>
                            <div className='flex items-center text-xs gap-[5px]'>
                                {/* <FaBed className='h-[18px] w-[18px] fill-none text-gray-700' strokeWidth={20} /> */}
                                <MdOutlineLocalHotel className='h-[18px] w-[18px] text-gray-500' />


                                <span className='font-semibold'>{amenities.bedrooms}</span>
                            </div>
                            <div className='flex items-center text-xs gap-[5px]'>
                                <PiCarLight className='h-[18px] w-[18px] fill-none text-gray-800' strokeWidth={6} />
                                <span className='font-semibold'>{amenities.garage}</span>
                            </div>
                            <div className='flex items-center text-xs gap-[5px]'>
                                <MdOutlineShower className='h-[18px] w-[18px] text-gray-500' />
                                <span className='font-semibold'>{amenities.bathrooms}</span>
                            </div>
                        </div>
                    </div>


                    <div className='w-[52%] max-w-[140px] min-w[128px]'>


                        {
                            liveVideo && (
                                <Button type='button' className='text-[11px] font-semibold w-full rounded-none bg-black text-white hover:bg-black/90'>
                                    <Play className='h-3 w-3 text-white fill-white' />
                                    LIVE TOUR VIDEO
                                </Button>
                            )
                        }
                    </div>
                </div>


            </CardContent>
        </Card>
    )
}


