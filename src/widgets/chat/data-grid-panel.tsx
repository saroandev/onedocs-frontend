// "use client";

// import React, { useState, useMemo, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   X,
//   Download,
//   Search,
//   ChevronUp,
//   ChevronDown,
//   Upload,
//   Filter,
//   Save,
//   Check,
//   ArrowUpDown,
//   FilterX,
// } from "lucide-react";

// interface DataGridPanelProps {
//   isOpen: boolean;
//   onClose: () => void;
//   columns?: string[];
//   tableName?: string;
// }

// // Default sample data - 10 legal documents
// const DEFAULT_DOCUMENTS = [
//   {
//     id: 1,
//     "Doküman Adı": "İş Sözleşmesi - Ahmet Yılmaz",
//     Kategori: "İş Hukuku",
//     Tarih: "15.01.2024",
//     Durum: "Aktif",
//     Taraflar: "ABC Şirketi - Ahmet Yılmaz",
//   },
//   {
//     id: 2,
//     "Doküman Adı": "Kira Sözleşmesi - Merkez Ofis",
//     Kategori: "Sözleşme Hukuku",
//     Tarih: "20.02.2024",
//     Durum: "Aktif",
//     Taraflar: "ABC Şirketi - XYZ Gayrimenkul",
//   },
//   {
//     id: 3,
//     "Doküman Adı": "Boşanma Davası Dilekçesi",
//     Kategori: "Aile Hukuku",
//     Tarih: "05.03.2024",
//     Durum: "Devam Ediyor",
//     Taraflar: "Ayşe Demir - Mehmet Demir",
//   },
//   {
//     id: 4,
//     "Doküman Adı": "Ticari Alacak Takibi",
//     Kategori: "Ticaret Hukuku",
//     Tarih: "12.03.2024",
//     Durum: "İcra Takibinde",
//     Taraflar: "DEF Ltd. - GHI A.Ş.",
//   },
//   {
//     id: 5,
//     "Doküman Adı": "Hizmet Satın Alma Sözleşmesi",
//     Kategori: "Sözleşme Hukuku",
//     Tarih: "18.03.2024",
//     Durum: "Onay Bekliyor",
//     Taraflar: "ABC Şirketi - Teknoloji A.Ş.",
//   },
//   {
//     id: 6,
//     "Doküman Adı": "İş Feshi İhbarnamesi",
//     Kategori: "İş Hukuku",
//     Tarih: "22.03.2024",
//     Durum: "Tamamlandı",
//     Taraflar: "ABC Şirketi - Zeynep Kaya",
//   },
//   {
//     id: 7,
//     "Doküman Adı": "Marka Tescil Başvurusu",
//     Kategori: "Fikri Mülkiyet",
//     Tarih: "28.03.2024",
//     Durum: "İnceleme Aşamasında",
//     Taraflar: "ABC Şirketi - TPE",
//   },
//   {
//     id: 8,
//     "Doküman Adı": "Taşınmaz Satış Sözleşmesi",
//     Kategori: "Gayrimenkul Hukuku",
//     Tarih: "02.04.2024",
//     Durum: "Noterde İmza Bekliyor",
//     Taraflar: "Ali Yıldız - Fatma Arslan",
//   },
//   {
//     id: 9,
//     "Doküman Adı": "İhtarname - Kira Borcu",
//     Kategori: "Borçlar Hukuku",
//     Tarih: "08.04.2024",
//     Durum: "Tebliğ Edildi",
//     Taraflar: "ABC Şirketi - Can Öztürk",
//   },
//   {
//     id: 10,
//     "Doküman Adı": "Ortaklık Sözleşmesi",
//     Kategori: "Ticaret Hukuku",
//     Tarih: "15.04.2024",
//     Durum: "Müzakere Aşamasında",
//     Taraflar: "ABC Şirketi - DEF Ltd. - GHI A.Ş.",
//   },
// ];

// export const DataGridPanel: React.FC<DataGridPanelProps> = ({
//   isOpen,
//   onClose,
//   columns = [],
//   tableName = "Veri Tablosu",
// }) => {
//   const [searchText, setSearchText] = useState("");
//   const [sortColumn, setSortColumn] = useState<string | null>(null);
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});
//   const [openFilterColumn, setOpenFilterColumn] = useState<string | null>(null);
//   const [isSaved, setIsSaved] = useState(false);
//   const [filterSearch, setFilterSearch] = useState<Record<string, string>>({});
//   const itemsPerPage = 10;

//   // Generate columns
//   const gridColumns = useMemo(() => {
//     if (columns.length === 0) {
//       return ["Doküman Adı", "Kategori", "Tarih", "Durum", "Taraflar"];
//     }
//     return columns;
//   }, [columns]);

//   // Generate row data
//   const dataSource = useMemo(() => {
//     if (columns.length === 0) {
//       return DEFAULT_DOCUMENTS;
//     }

//     return Array.from({ length: 5 }, (_, index) => {
//       const row: Record<string, any> = { id: index + 1 };
//       columns.forEach((col) => {
//         row[col] = "";
//       });
//       return row;
//     });
//   }, [columns]);

//   // Get unique values for each column
//   const columnUniqueValues = useMemo(() => {
//     const uniqueValues: Record<string, string[]> = {};
//     gridColumns.forEach((col) => {
//       const values = new Set<string>();
//       dataSource.forEach((row) => {
//         const value = row[col];
//         if (value) values.add(value.toString());
//       });
//       uniqueValues[col] = Array.from(values).sort();
//     });
//     return uniqueValues;
//   }, [dataSource, gridColumns]);

//   // Toggle column filter value
//   const toggleColumnFilter = useCallback((column: string, value: string) => {
//     setColumnFilters((prev) => {
//       const newFilters = { ...prev };
//       const currentFilters = newFilters[column] || [];

//       if (currentFilters.includes(value)) {
//         newFilters[column] = currentFilters.filter((v) => v !== value);
//         if (newFilters[column].length === 0) {
//           delete newFilters[column];
//         }
//       } else {
//         newFilters[column] = [...currentFilters, value];
//       }

//       return newFilters;
//     });
//     setCurrentPage(1);
//   }, []);

//   // Clear column filter
//   const clearColumnFilter = useCallback((column: string) => {
//     setColumnFilters((prev) => {
//       const newFilters = { ...prev };
//       delete newFilters[column];
//       return newFilters;
//     });
//   }, []);

//   // Clear all filters
//   const clearAllFilters = useCallback(() => {
//     setColumnFilters({});
//     setSearchText("");
//     setCurrentPage(1);
//   }, []);

//   // Active filter count
//   const activeFilterCount = useMemo(() => {
//     return Object.keys(columnFilters).length;
//   }, [columnFilters]);

//   // Filter data
//   const filteredData = useMemo(() => {
//     let data = dataSource;

//     if (Object.keys(columnFilters).length > 0) {
//       data = data.filter((row) => {
//         return Object.entries(columnFilters).every(([column, values]) => {
//           const rowValue = row[column]?.toString() || "";
//           return values.includes(rowValue);
//         });
//       });
//     }

//     if (searchText) {
//       data = data.filter((row) => {
//         return gridColumns.some((col) => {
//           const value = row[col];
//           return value && value.toString().toLowerCase().includes(searchText.toLowerCase());
//         });
//       });
//     }

//     return data;
//   }, [dataSource, searchText, gridColumns, columnFilters]);

//   // Sort data
//   const sortedData = useMemo(() => {
//     if (!sortColumn) return filteredData;

//     return [...filteredData].sort((a, b) => {
//       const aVal = a[sortColumn] || "";
//       const bVal = b[sortColumn] || "";

//       if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [filteredData, sortColumn, sortDirection]);

//   // Paginate data
//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return sortedData.slice(startIndex, startIndex + itemsPerPage);
//   }, [sortedData, currentPage]);

//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);

//   // Handle sort
//   const handleSort = useCallback(
//     (column: string) => {
//       if (sortColumn === column) {
//         setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//       } else {
//         setSortColumn(column);
//         setSortDirection("asc");
//       }
//     },
//     [sortColumn, sortDirection]
//   );

//   // Handle file upload
//   const handleFileUpload = useCallback(() => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = ".pdf,.doc,.docx,.txt";
//     input.multiple = true;

//     input.onchange = (e) => {
//       const files = (e.target as HTMLInputElement).files;
//       if (files && files.length > 0) {
//         alert(`${files.length} belge yüklendi`);
//       }
//     };

//     input.click();
//   }, []);

//   // Export to CSV
//   const onExportData = useCallback(() => {
//     const csvContent = [
//       gridColumns.join(","),
//       ...sortedData.map((row) =>
//         gridColumns
//           .map((col) => {
//             const value = row[col] || "";
//             return `"${value}"`;
//           })
//           .join(",")
//       ),
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `${tableName.toLowerCase().replace(/\s+/g, "-")}-${
//       new Date().toISOString().split("T")[0]
//     }.csv`;
//     link.click();
//   }, [sortedData, gridColumns, tableName]);

//   // Handle save table
//   const handleSaveTable = useCallback(() => {
//     // Simulate saving the table
//     setIsSaved(true);
//     // In a real application, you would save to database here
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <div className="flex-shrink-0 w-[900px] border-l border-border bg-background flex flex-col h-full">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
//         <div className="flex items-center gap-2">
//           <h2 className="font-semibold text-base text-text-primary">
//             {tableName || "Hukuk Dokümanları"}
//           </h2>
//           <span className="text-xs text-text-muted">
//             ({gridColumns.length} sütun, {sortedData.length} kayıt)
//           </span>
//           {activeFilterCount > 0 && (
//             <div className="flex items-center gap-1">
//               <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
//                 {activeFilterCount} filtre aktif
//               </span>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="h-6 px-2 text-xs text-primary hover:text-primary/80"
//                 onClick={clearAllFilters}
//               >
//                 <FilterX className="h-3 w-3 mr-1" />
//                 Temizle
//               </Button>
//             </div>
//           )}
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant={isSaved ? "outline" : "default"}
//             size="sm"
//             className="h-8 gap-2"
//             onClick={handleSaveTable}
//             disabled={isSaved}
//           >
//             {isSaved ? (
//               <>
//                 <Check className="h-4 w-4" />
//                 Tablo Kaydedildi
//               </>
//             ) : (
//               <>
//                 <Save className="h-4 w-4" />
//                 Tabloyu Kaydet
//               </>
//             )}
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 rounded-full hover:bg-accent"
//             onClick={onClose}
//             aria-label="Tabloyu kapat"
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {/* Enhanced Toolbar */}
//       <div className="px-4 py-3 border-b border-border bg-gradient-to-r from-surface/50 to-surface/30 flex items-center gap-3">
//         <div className="relative flex-1 min-w-[200px] max-w-md">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
//           <Input
//             type="text"
//             placeholder="Tüm sütunlarda ara..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             className="pl-9 h-9 text-sm bg-background border-border/50 focus:border-primary/50 transition-colors"
//           />
//           {searchText && (
//             <button
//               onClick={() => setSearchText("")}
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
//             >
//               <X className="h-3.5 w-3.5" />
//             </button>
//           )}
//         </div>
//         <div className="h-5 w-px bg-border" />
//         <Button
//           variant="default"
//           size="sm"
//           className="h-9 gap-2 text-sm shadow-sm"
//           onClick={handleFileUpload}
//         >
//           <Upload className="h-4 w-4" />
//           Belge Yükle
//         </Button>
//         <Button variant="outline" size="sm" className="h-9 gap-2 text-sm" onClick={onExportData}>
//           <Download className="h-4 w-4" />
//           Dışa Aktar
//         </Button>
//       </div>

//       {/* Modern Table */}
//       <div className="flex-1 overflow-auto">
//         <table className="w-full border-collapse">
//           <thead className="bg-gradient-to-b from-surface to-surface/50 sticky top-0 z-10 shadow-sm">
//             <tr>
//               {gridColumns.map((col) => {
//                 const hasFilter = columnFilters[col]?.length > 0;
//                 const uniqueValues = columnUniqueValues[col] || [];
//                 const isFilterOpen = openFilterColumn === col;
//                 const isSorted = sortColumn === col;
//                 const searchValue = filterSearch[col] || "";

//                 const filteredUniqueValues = searchValue
//                   ? uniqueValues.filter((v) => v.toLowerCase().includes(searchValue.toLowerCase()))
//                   : uniqueValues;

//                 return (
//                   <th
//                     key={col}
//                     className="px-4 py-3 text-left text-sm font-semibold text-text-primary border-b-2 border-border/70 relative group"
//                   >
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => handleSort(col)}
//                         className={`flex items-center gap-1.5 hover:text-primary transition-colors ${
//                           isSorted ? "text-primary" : ""
//                         }`}
//                       >
//                         <span className="font-semibold">{col}</span>
//                         {isSorted ? (
//                           sortDirection === "asc" ? (
//                             <ChevronUp className="h-4 w-4" />
//                           ) : (
//                             <ChevronDown className="h-4 w-4" />
//                           )
//                         ) : (
//                           <ArrowUpDown className="h-3.5 w-3.5 opacity-0 group-hover:opacity-40 transition-opacity" />
//                         )}
//                       </button>

//                       {uniqueValues.length > 0 && (
//                         <div className="relative">
//                           <button
//                             onClick={() => setOpenFilterColumn(isFilterOpen ? null : col)}
//                             className={`h-7 w-7 flex items-center justify-center rounded-md transition-all ${
//                               hasFilter
//                                 ? "text-primary bg-primary/15 hover:bg-primary/25"
//                                 : "text-text-muted hover:bg-accent hover:text-text-primary opacity-60 group-hover:opacity-100"
//                             }`}
//                             title="Filtrele"
//                           >
//                             <Filter className="h-3.5 w-3.5" />
//                             {hasFilter && (
//                               <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
//                                 {columnFilters[col]?.length}
//                               </span>
//                             )}
//                           </button>

//                           {isFilterOpen && (
//                             <>
//                               <div
//                                 className="fixed inset-0 z-20"
//                                 onClick={() => setOpenFilterColumn(null)}
//                               />
//                               <div className="absolute left-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-xl z-30 overflow-hidden">
//                                 <div className="p-3 border-b border-border bg-surface/50">
//                                   <div className="flex items-center justify-between mb-2">
//                                     <span className="text-sm font-semibold text-text-primary">
//                                       {col}
//                                     </span>
//                                     {hasFilter && (
//                                       <button
//                                         onClick={() => {
//                                           clearColumnFilter(col);
//                                           setFilterSearch((prev) => ({ ...prev, [col]: "" }));
//                                         }}
//                                         className="text-xs text-primary hover:text-primary/80 font-medium"
//                                       >
//                                         Tümünü Temizle
//                                       </button>
//                                     )}
//                                   </div>
//                                   {uniqueValues.length > 5 && (
//                                     <div className="relative">
//                                       <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
//                                       <Input
//                                         type="text"
//                                         placeholder="Değerlerde ara..."
//                                         value={searchValue}
//                                         onChange={(e) =>
//                                           setFilterSearch((prev) => ({
//                                             ...prev,
//                                             [col]: e.target.value,
//                                           }))
//                                         }
//                                         className="pl-8 h-8 text-xs"
//                                         onClick={(e) => e.stopPropagation()}
//                                       />
//                                     </div>
//                                   )}
//                                 </div>
//                                 <div className="max-h-72 overflow-y-auto">
//                                   {filteredUniqueValues.length > 0 ? (
//                                     filteredUniqueValues.map((value) => {
//                                       const isChecked =
//                                         columnFilters[col]?.includes(value) || false;
//                                       return (
//                                         <label
//                                           key={value}
//                                           className={`flex items-center gap-2 px-3 py-2 hover:bg-accent cursor-pointer text-sm transition-colors ${
//                                             isChecked ? "bg-primary/5" : ""
//                                           }`}
//                                         >
//                                           <input
//                                             type="checkbox"
//                                             checked={isChecked}
//                                             onChange={() => toggleColumnFilter(col, value)}
//                                             className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0 w-4 h-4"
//                                           />
//                                           <span
//                                             className={
//                                               isChecked
//                                                 ? "font-medium text-text-primary"
//                                                 : "text-text-secondary"
//                                             }
//                                           >
//                                             {value}
//                                           </span>
//                                         </label>
//                                       );
//                                     })
//                                   ) : (
//                                     <div className="px-3 py-6 text-center text-sm text-text-muted">
//                                       Sonuç bulunamadı
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </th>
//                 );
//               })}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <tr
//                   key={row.id}
//                   className="border-b border-border/50 hover:bg-accent/50 transition-colors group"
//                 >
//                   {gridColumns.map((col) => (
//                     <td key={col} className="px-4 py-3 text-sm text-text-secondary">
//                       <div className="truncate" title={row[col] || "-"}>
//                         {row[col] || <span className="text-text-muted italic">-</span>}
//                       </div>
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={gridColumns.length} className="px-4 py-12 text-center">
//                   <div className="flex flex-col items-center gap-2">
//                     <div className="h-12 w-12 rounded-full bg-surface flex items-center justify-center">
//                       <Search className="h-6 w-6 text-text-muted" />
//                     </div>
//                     <p className="text-sm font-medium text-text-primary">Sonuç bulunamadı</p>
//                     <p className="text-xs text-text-muted">
//                       Arama kriterlerinizi değiştirmeyi deneyin
//                     </p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Enhanced Pagination */}
//       <div className="px-4 py-3 border-t border-border bg-surface/30 flex items-center justify-between">
//         <div className="text-sm text-text-secondary">
//           <span className="font-medium text-text-primary">{sortedData.length}</span> kayıttan{" "}
//           <span className="font-medium text-text-primary">
//             {(currentPage - 1) * itemsPerPage + 1}-
//             {Math.min(currentPage * itemsPerPage, sortedData.length)}
//           </span>{" "}
//           arası gösteriliyor
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//             className="h-8"
//           >
//             <ChevronUp className="h-4 w-4 rotate-[-90deg]" />
//             Önceki
//           </Button>
//           <div className="flex items-center gap-1 px-2">
//             <span className="text-sm font-medium text-text-primary">{currentPage}</span>
//             <span className="text-sm text-text-muted">/</span>
//             <span className="text-sm text-text-muted">{totalPages || 1}</span>
//           </div>
//           <Button
//             variant="outline"
//             size="sm"
//             disabled={currentPage === totalPages || totalPages === 0}
//             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//             className="h-8"
//           >
//             Sonraki
//             <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataGridPanel;
