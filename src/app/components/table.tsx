"use client";

import { useSession } from 'next-auth/react';
import ProductService from '../api/product/product.api';
import { AddProduct, Product } from '../interface/product.interface';
import { useEffect, useState } from 'react';
import { Message, Modal } from 'rsuite';
interface ApiResponse  {
  statusCode: number;
  timestamp: string;
  data: Product[] ; 
}

export default function Table() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [productById, setProductById] = useState<Product[]>()
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editedProduct, setEditedProduct] = useState<Product[]>();
  const [deletedProduct, setDeletedProduct] = useState<Product[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [Action, setAction] = useState('')
  const [newProduct, setNewProduct] = useState<AddProduct>({
    name: '',
    price: '',
    description: '',
    createdBy: '',
    active: true,
  });
  
  const getProducts = () => {
    ProductService.getAllProducts().then((response: ApiResponse) => {
      setProducts(response.data);
    }).catch(error => {
      console.error('Error getting products:', error);
      setProducts([]); // หรือจะทำการจัดการ error ตามที่ต้องการ
    });
  }
  const handleReadClick = (Id : string, action: string) => {
    console.log(action)
    ProductService.getProductById(Id).then((response: ApiResponse) => {
      const data = response.data
      if(action === 'read'){
        setProductById(data )
        setIsModalOpen(true);
        console.log('r')
      } else if (action === 'update') {
        setEditedProduct(data)
        setIsModalOpen(true);
        console.log('u')
      } else if (action === 'delete') {
        console.log('d')
        setDeletedProduct(data)
        setIsModalOpen(true);
      }

    })
  };
  const handleAddProductClick = () => {
    setAction('Add')
    setIsModalOpen(true);
  };

  const handleUpdateClick = () => {
    if (editedProduct) {
      console.log(editedProduct[0]);
      ProductService.updateProduct(editedProduct[0].id, editedProduct[0]).then((response : ApiResponse)=>{
        let data = response.statusCode;
        if(data === 200){
          setIsModalOpen(false);
          
          alert("อัพเดตสำเร็จ")
        }
      });
    } 
  };

  const handleDeleteClick = () => {
    if (deletedProduct) {
      console.log(deletedProduct[0]);
      ProductService.deleteProduct(deletedProduct[0].id).then((response : ApiResponse)=>{
        let data = response.statusCode;
        if(data === 200){
          setIsModalOpen(false);
          alert("ลบสำเร็จ")
          window.location.reload();
        }
      });
    } 
  };

  const handleAddPeoductClick = () => {
    if (newProduct) {
      const userEmail = session?.user?.email || '';
      const newData: AddProduct = {
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        createdBy: userEmail, 
        active: newProduct.active,
      };

      ProductService.createProduct(newData).then((response : ApiResponse)=>{
        let data = response.statusCode;
        if(data){
          setIsModalOpen(false);
          alert("สร้างสำเร็จ")
          window.location.reload();
        }
      });
    } 
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setProductById([])
    setEditedProduct([])
    setDeletedProduct([])
    setAction("")
  };
  useEffect(() => {
    getProducts()
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex'>
      <h1 className="text-3xl font-semibold mb-4">Product List</h1>
      <button onClick={handleAddProductClick} className="ms-6 p-10 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 border border-red-200">
                AddProduct
              </button>
      </div>
     
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Created By</th>
              <th className="px-4 py-2">Active</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
            <tr key={index} className="border-t">
            <td className="px-4 py-2">{product.name}</td>
            <td className="px-4 py-2">${product.price}</td>
            <td className="px-4 py-2">{product.description}</td>
            <td className="px-4 py-2">{product.createdBy}</td>
            <td className="px-4 py-2">{product.active ? 'Yes' : 'No'}</td>
            <td className="px-4 py-2">
              <button onClick={() => handleReadClick(product.id,'read')} className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mr-2 border border-green-200">
                Read
              </button>
            </td>
            <td className="px-4 py-2">
              <button  onClick={() => handleReadClick(product.id,'update')} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 border border-yellow-200">
                 Update
              </button>
            </td>
            <td className="px-4 py-2">
              <button onClick={() => handleReadClick(product.id,'delete')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 border border-red-200">
                Delete
              </button>
            </td>

          </tr>
          
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
  {productById && productById.length > 0 && (
    productById.map((product, index) => (
      <div key={index}>
        <h1>ข้อมูล</h1>
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>
        <p>Created By: {product.createdBy}</p>
        <p></p>
        <button onClick={closeModal} className='bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded mr-2 border border-red-200'>Close</button> {/* ปุ่มปิด Modal */}
      </div>
    ))
  )}
</Modal>


<Modal open={isModalOpen && editedProduct && editedProduct.length > 0} onClose={closeModal}>
  {editedProduct && editedProduct.map((product, index) => (
    <div key={index}>
      <h1>แก้ไขข้อมูล</h1>
      <div className="flex flex-col space-y-4">
        <input 
          type="text" 
          value={product.name} 
          onChange={(e) => setEditedProduct(editedProduct.map((p, i) => i === index ? { ...p, name: e.target.value } : p))}
          className="border rounded px-2 py-1"
        />
        <input 
          type="text" 
          value={product.price} 
          onChange={(e) => setEditedProduct(editedProduct.map((p, i) => i === index ? { ...p, price: e.target.value } : p))}
          className="border rounded px-2 py-1"
        />
        <input 
          type="text" 
          value={product.description} 
          onChange={(e) => setEditedProduct(editedProduct.map((p, i) => i === index ? { ...p, description: e.target.value } : p))}
          className="border rounded px-2 py-1"
        />
      </div>

      <div>
        <button onClick={closeModal} className='bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded mr-2 border border-red-200'>Cancel</button>
        <button onClick={handleUpdateClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 border border-red-200'>Update</button>
      </div>
    </div>
  ))}
</Modal>

<Modal open={isModalOpen && deletedProduct && deletedProduct.length >0} onClose={closeModal}>
  {deletedProduct && deletedProduct.length > 0 &&(
    <div className="flex flex-col justify-center items-center">
      <h1>ยืนยันจะลบข้อมูลหรือไม่</h1>
      <div className="flex mt-4">
        <button onClick={closeModal} className="bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded mr-2 border border-red-200">Cancel</button>
        <button onClick={handleDeleteClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 border border-red-200">Update</button>
      </div>
    </div>
  )}
</Modal>
{Action !== "" && (
<Modal open={isModalOpen} onClose={closeModal}>
  {Action !== "" && (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        className="border rounded px-2 py-1"
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        className="border rounded px-2 py-1"
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        className="border rounded px-2 py-1"
      />

       <div className="flex mt-4">
        <button onClick={closeModal} className="bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded mr-2 border border-red-200">Cancel</button>
        <button onClick={handleAddPeoductClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 border border-red-200">Add Peoduct</button>
      </div>
    </div>
  )}
</Modal>
 )}




  
    </div>
  );
}
