import React from "react";

const ProductCategoryCard = ({ category }) => {
  return (
    <div className="w-[250px] flex flex-col gap-4 transition-all duration-300 cursor-pointer md:w-[170px]">
      <div className="relative flex items-center justify-center rounded-md transition-all duration-300 hover:bg-black">
        <img 
          src={category.img} 
          alt={category.name}
          className="w-full h-[320px] md:h-[230px] rounded-md object-cover transition-all duration-300 hover:opacity-90" 
        />
        <div className="absolute bottom-0 left-0 right-0 w-full z-10">
          <div className="w-full text-white bg-gradient-to-t from-black/90 to-transparent py-3 px-5 rounded-xl text-center font-medium md:py-1.5 md:px-3.5">
            {category.name}
          </div>
        </div>
        <div className="absolute top-2.5 right-2.5 text-xs font-semibold text-white bg-green-600 py-0.5 px-1.5 rounded md:text-[10px]">
          {category.off}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryCard;
