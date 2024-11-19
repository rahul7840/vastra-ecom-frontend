'use client';
import { ProductCard } from '@/modules/common/components/Product';
import { useProducts } from '../queries/use-products';
import { useState } from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
} from '@/modules/common/components/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

export const NewArrivalTemplate = () => {
	const [sortBy, setSortBy] = useState('createdAt:desc');

	const searchParams = useSearchParams();

	const { products, meta } = useProducts({
		limit: 10,
		page: Number(searchParams.get('page')) || 1,
		sort: sortBy,
	});

	const totalPages = meta?.lastPage ?? 1;

	const router = useRouter();
	const currentPage = Number(searchParams.get('page')) || 1;

	const handlePageChange = (page: number) => {
		router.push(`/products?page=${page}`);
	};

	return (
		<div className=' mx-auto px-4 py-8'>
			{/* Header Section */}
			<div className='mb-8 text-center'>
				<h1 className='text-2xl md:text-4xl font-bold text-[#212121] mb-4'>
					New Arrivals
				</h1>
				<p className='text-[#757575] text-sm md:text-base max-w-2xl mx-auto'>
					Discover our latest collection of trendsetting pieces that just landed
				</p>
			</div>

			<div className='mb-8 flex justify-between items-center'>
				<div className='flex items-center gap-2'>
					<span className='text-sm text-[#757575]'>Sort by:</span>
					<select
						className='border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4F1010]'
						onChange={(e) => setSortBy(e.target.value)}
					>
						<option value='createdAt:desc'>Newest First</option>
						<option value='price:asc'>Price: Low to High</option>
						<option value='price:desc'>Price: High to Low</option>
						<option value='popularity'>Popularity</option>
					</select>
				</div>
			</div>

			{/* Products Grid */}
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>
				{products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			{/* Load More Button */}
			<div className='mt-12 flex items-center justify-center'>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
							/>
						</PaginationItem>

						{/* First Page */}
						{currentPage > 2 && (
							<PaginationItem>
								<PaginationLink onClick={() => handlePageChange(1)}>
									1
								</PaginationLink>
							</PaginationItem>
						)}

						{/* Ellipsis */}
						{currentPage > 3 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}

						{/* Previous Page */}
						{currentPage > 1 && (
							<PaginationItem>
								<PaginationLink
									onClick={() => handlePageChange(currentPage - 1)}
								>
									{currentPage - 1}
								</PaginationLink>
							</PaginationItem>
						)}

						{/* Current Page */}
						<PaginationItem>
							<PaginationLink isActive>{currentPage}</PaginationLink>
						</PaginationItem>

						{/* Next Page */}
						{currentPage < totalPages && (
							<PaginationItem>
								<PaginationLink
									onClick={() => handlePageChange(currentPage + 1)}
								>
									{currentPage + 1}
								</PaginationLink>
							</PaginationItem>
						)}

						{/* Ellipsis */}
						{currentPage < totalPages - 2 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}

						{/* Last Page */}
						{currentPage < totalPages - 1 && (
							<PaginationItem>
								<PaginationLink onClick={() => handlePageChange(totalPages)}>
									{totalPages}
								</PaginationLink>
							</PaginationItem>
						)}

						<PaginationItem>
							<PaginationNext
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>

			{/* Empty State */}
			{products?.length === 0 && (
				<div className='text-center py-16'>
					<div className='text-6xl mb-4'>🏷️</div>
					<h3 className='text-xl font-semibold text-[#212121] mb-2'>
						No Products Found
					</h3>
					<p className='text-[#757575]'>
						We're constantly adding new products. Check back soon!
					</p>
				</div>
			)}
		</div>
	);
};
