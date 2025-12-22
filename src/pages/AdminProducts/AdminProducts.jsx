// AdminProducts.jsx
import React, { useEffect, useState } from 'react';
import cls from 'classnames'; // npm install classnames
import styles from './styles.module.scss';

// Import API services
import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '@/apis/productsService';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // State để biết đang Sửa hay Thêm (null = Thêm, có ID = Sửa)
    const [editId, setEditId] = useState(null);

    // Form data
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        type: '',
        material: '',
        sku: '',
        imagesString: '', // Chuỗi ảnh cách nhau dấu phẩy
        sizes: [{ name: 'S', quantity: 0 }]
    });

    // 1. Load danh sách
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data.data || res.data || []);
        } catch (error) {
            console.error('Lỗi lấy sản phẩm:', error);
        }
    };

    // 2. Xử lý nhập liệu chung
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 3. Xử lý Size động
    const handleSizeChange = (index, field, value) => {
        const newSizes = [...formData.sizes];
        newSizes[index][field] = value;
        setFormData({ ...formData, sizes: newSizes });
    };

    const addSizeRow = () => {
        setFormData({
            ...formData,
            sizes: [...formData.sizes, { name: '', quantity: 0 }]
        });
    };

    const removeSizeRow = (index) => {
        const newSizes = formData.sizes.filter((_, i) => i !== index);
        setFormData({ ...formData, sizes: newSizes });
    };

    // 4. Hàm bấm nút "Sửa"
    const handleEdit = (product) => {
        setEditId(product._id);
        setIsFormVisible(true);
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description || '',
            type: product.type || '',
            material: product.material || '',
            sku: product.SKU || '',
            imagesString: product.images ? product.images.join(', ') : '',
            sizes:
                product.size && product.size.length > 0
                    ? product.size
                    : [{ name: 'S', quantity: 0 }]
        });
        window.scrollTo(0, 0);
    };

    // 5. Hàm Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            price: Number(formData.price),
            description: formData.description,
            type: formData.type,
            material: formData.material,
            SKU: formData.sku,
            images: formData.imagesString
                .split(',')
                .map((url) => url.trim())
                .filter((url) => url !== ''),
            size: formData.sizes
        };

        try {
            if (editId) {
                await updateProduct(editId, payload);
                alert('Cập nhật thành công!');
            } else {
                await createProduct(payload);
                alert('Thêm mới thành công!');
            }

            // Reset form
            setIsFormVisible(false);
            setEditId(null);
            setFormData({
                name: '',
                price: '',
                description: '',
                type: '',
                material: '',
                sku: '',
                imagesString: '',
                sizes: [{ name: 'S', quantity: 0 }]
            });
            fetchProducts();
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data?.message || error.message));
        }
    };

    // 6. Xóa sản phẩm
    const handleDelete = async (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await deleteProduct(id);
                fetchProducts();
            } catch (error) {
                alert('Lỗi xóa: ' + error.message);
            }
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setEditId(null);
        setFormData({
            name: '',
            price: '',
            description: '',
            type: '',
            material: '',
            sku: '',
            imagesString: '',
            sizes: [{ name: 'S', quantity: 0 }]
        });
    };

    return (
        <div className={styles.container}>
            <h1>Manage Products</h1>

            {/* Nút Mở Form Thêm Mới */}
            {!isFormVisible && (
                <button
                    onClick={() => setIsFormVisible(true)}
                    className={styles.addBtn}
                >
                    + Add New Product
                </button>
            )}

            {/* FORM NHẬP LIỆU */}
            {isFormVisible && (
                <div className={styles.formContainer}>
                    <h3>{editId ? 'Edit Products' : 'Add New Product'}</h3>

                    <form onSubmit={handleSubmit} className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                            <label>Product Name:</label>
                            <input
                                className={styles.input}
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Price ($):</label>
                            <input
                                className={styles.input}
                                type='number'
                                name='price'
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Type:</label>
                            <input
                                className={styles.input}
                                name='type'
                                value={formData.type}
                                onChange={handleChange}
                                placeholder='hoodie, t-shirt...'
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Material:</label>
                            <input
                                className={styles.input}
                                name='material'
                                value={formData.material}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>SKU:</label>
                            <input
                                className={styles.input}
                                name='sku'
                                value={formData.sku}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Full width inputs */}
                        <div
                            className={cls(styles.inputGroup, styles.fullWidth)}
                        >
                            <label>Image links (separated by commas):</label>
                            <textarea
                                className={styles.textarea}
                                style={{ height: '60px' }}
                                name='imagesString'
                                value={formData.imagesString}
                                onChange={handleChange}
                                placeholder='https://anh1.jpg, https://anh2.jpg'
                            />
                        </div>

                        <div
                            className={cls(styles.inputGroup, styles.fullWidth)}
                        >
                            <label>Description:</label>
                            <textarea
                                className={styles.textarea}
                                style={{ height: '80px' }}
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* INPUT SIZE SECTION */}
                        <div className={styles.sizeSection}>
                            <label style={{ fontWeight: 'bold' }}>
                                Size & Quantity:
                            </label>
                            {formData.sizes.map((item, index) => (
                                <div key={index} className={styles.sizeRow}>
                                    <input
                                        placeholder='Size (S, M...)'
                                        value={item.name}
                                        onChange={(e) =>
                                            handleSizeChange(
                                                index,
                                                'name',
                                                e.target.value
                                            )
                                        }
                                    />
                                    <input
                                        type='number'
                                        placeholder='Số lượng'
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleSizeChange(
                                                index,
                                                'quantity',
                                                e.target.value
                                            )
                                        }
                                    />
                                    {formData.sizes.length > 1 && (
                                        <button
                                            type='button'
                                            onClick={() => removeSizeRow(index)}
                                            className={styles.deleteSizeBtn}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type='button'
                                onClick={addSizeRow}
                                className={styles.addSizeBtn}
                            >
                                + Add Size
                            </button>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className={styles.formActions}>
                            <button
                                type='submit'
                                className={cls(styles.submitBtn, {
                                    [styles.update]: !!editId,
                                    [styles.create]: !editId
                                })}
                            >
                                {editId ? 'Update' : 'Save Product'}
                            </button>
                            <button
                                type='button'
                                onClick={handleCancel}
                                className={styles.cancelBtn}
                            >
                                Cancle
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* BẢNG DANH SÁCH */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Imgage</th>
                        <th>Product Info</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Decision</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((sp) => (
                            <tr key={sp._id}>
                                <td style={{ textAlign: 'left' }}>
                                    {sp.images && sp.images.length > 0 ? (
                                        <img
                                            src={sp.images[0]}
                                            alt={sp.name}
                                            className={styles.productImg}
                                        />
                                    ) : (
                                        <span
                                            style={{
                                                fontSize: '12px',
                                                color: '#999'
                                            }}
                                        >
                                            No Image
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <div className={styles.productName}>
                                        {sp.name}
                                    </div>
                                    <div className={styles.productMeta}>
                                        SKU: {sp.SKU} | Type: {sp.type}
                                    </div>
                                </td>
                                <td className={styles.priceText}>
                                    {sp.price?.toLocaleString()}$
                                </td>
                                <td>
                                    {sp.size?.map((s, idx) => (
                                        <span
                                            key={idx}
                                            className={styles.sizeBadge}
                                        >
                                            {s.name}: <b>{s.quantity}</b>
                                        </span>
                                    ))}
                                </td>
                                <td
                                    className={cls(
                                        styles.actionCell,
                                        styles.textLeft
                                    )}
                                >
                                    <button
                                        onClick={() => handleEdit(sp)}
                                        className={cls(
                                            styles.actionBtn,
                                            styles.edit
                                        )}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(sp._id)}
                                        className={cls(
                                            styles.actionBtn,
                                            styles.delete
                                        )}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan='5' className={styles.emptyRow}>
                                No products yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProducts;
