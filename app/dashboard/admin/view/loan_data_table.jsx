import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons for pagination
import { cn } from "@/lib/utils"; // For conditional classnames

const LoanDataTable = ({ initialData = [], columns, pageSize = 10 }) => {
    const [data, setData] = useState(initialData);
    const [filters, setFilters] = useState({}); // Filters for each column
    const [currentPage, setCurrentPage] = useState(1);

    // Effect to apply filters and update data when initialData or filters change
    useEffect(() => {
        let filtered = initialData.filter(item => {
            return Object.keys(filters).every(key => {
                const filterValue = filters[key]?.toLowerCase();
                const itemValue = String(item[key])?.toLowerCase();
                return !filterValue || itemValue.includes(filterValue);
            });
        });
        setData(filtered);
        setCurrentPage(1); // Reset to first page on filter change
    }, [initialData, filters]);

    // Calculate pagination values
    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = data.slice(startIndex, endIndex);

    // Handle filter input changes
    const handleFilterChange = (columnAccessor, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [columnAccessor]: value,
        }));
    };

    // Handle pagination button clicks
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div className="w-full">
            {/* Filter Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {columns.map((column) => (
                    column.filterable && (
                        <div key={column.accessor} className="space-y-2">
                            <Label htmlFor={`filter-${column.accessor}`}>{`Filter ${column.header}`}</Label>
                            <Input
                                id={`filter-${column.accessor}`}
                                type="text"
                                placeholder={`Search by ${column.header}`}
                                value={filters[column.accessor] || ''}
                                onChange={(e) => handleFilterChange(column.accessor, e.target.value)}
                                className="w-full rounded-md shadow-sm"
                            />
                        </div>
                    )
                ))}
            </div>

            {/* Data Table */}
            <div className="rounded-md border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.accessor} className="font-semibold text-gray-700">
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <TableRow key={item.id || index} className="hover:bg-gray-50">
                                    {columns.map((column) => (
                                        <TableCell key={column.accessor} className="py-3 px-4 text-sm text-gray-800">
                                            {item[column.accessor]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                                    No data found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1"
                >
                    <ChevronLeft className="h-4 w-4" /> Previous
                </Button>
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages} ({data.length} total items)
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1"
                >
                    Next <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default LoanDataTable;

