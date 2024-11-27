'use client';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/modules/common/components/Pagination';
import { ProductCard } from '@/modules/common/components/Product';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useProducts } from '../queries/use-products';

interface Props {
	title: string;
	description?: string;
	url: string;
}

export const ProductListTemplate = (props: Props) => {
	const { title, description, url } = props;
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
		router.push(`${url}?page=${page}`);
	};

	return (
		<div className='flex flex-col items-center w-full max-w-[22rem] sm:max-w-[32rem] md:max-w-[45rem] lg:max-w-[58rem] xl:max-w-[77rem] mx-auto py-8'>
			<div className='mb-8 text-center'>
				<h1 className='text-2xl md:text-4xl font-bold text-[#212121] mb-4'>
					{title}
				</h1>
				<p className='text-[#757575] w-full text-center text-sm md:text-base'>
					{description}
				</p>
			</div>

			<div className='sm:mr-4 md:mr-8  mb-8 flex items-center justify-end gap-2 w-full'>
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

			{/* Products Grid */}
			<div className='flex flex-col items-center'>
				<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-4 md:gap-6 md:gap-y-16 lg:gap-y-20 lg:gap-10'>
					{products?.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>

			<div className='mt-12 flex items-center justify-center'>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
							/>
						</PaginationItem>

						{currentPage > 2 && (
							<PaginationItem>
								<PaginationLink onClick={() => handlePageChange(1)}>
									1
								</PaginationLink>
							</PaginationItem>
						)}

						{currentPage > 3 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}

						{currentPage > 1 && (
							<PaginationItem>
								<PaginationLink
									onClick={() => handlePageChange(currentPage - 1)}
								>
									{currentPage - 1}
								</PaginationLink>
							</PaginationItem>
						)}

						<PaginationItem>
							<PaginationLink isActive>{currentPage}</PaginationLink>
						</PaginationItem>

						{currentPage < totalPages && (
							<PaginationItem>
								<PaginationLink
									onClick={() => handlePageChange(currentPage + 1)}
								>
									{currentPage + 1}
								</PaginationLink>
							</PaginationItem>
						)}

						{currentPage < totalPages - 2 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}

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
