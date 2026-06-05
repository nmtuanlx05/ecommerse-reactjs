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

    // State quản lý lỗi validation
    const [errors, setErrors] = useState({});

    // 1. Load danh sách
    useEffect(() => {
        fetchProducts();
    }, []);

    // Validate realtime khi formData thay đổi (khi form mở)
    useEffect(() => {
        if (isFormVisible) {
            const tempErrors = validateFormData();
            setErrors(tempErrors);
        }
    }, [formData, isFormVisible]);

    const fetchProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data.data || res.data || []);
        } catch (error) {
            console.error('Lỗi lấy sản phẩm:', error);
            if (error.response?.status === 401) {
                alert('❌ Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.');
                window.location.href = '/login';
            }
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

    // ============ HÀM VALIDATE DỮ LIỆU ============
    /**
     * Kiểm tra URL có hợp lệ hay không
     * @param {string} url - Đường dẫn URL
     * @returns {boolean} true nếu URL hợp lệ
     */
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    /**
     * Hàm validate toàn bộ dữ liệu form
     * @returns {object} Object chứa các lỗi (key: tên field, value: thông báo lỗi)
     */
    const validateFormData = () => {
        const newErrors = {};

        // 1. Validate tên sản phẩm
        const name = String(formData.name || '').trim();
        if (!name) {
            newErrors.name = 'Tên sản phẩm không được để trống';
        } else if (name.length < 3) {
            newErrors.name = 'Tên sản phẩm phải có ít nhất 3 ký tự';
        } else if (name.length > 100) {
            newErrors.name = 'Tên sản phẩm không được vượt quá 100 ký tự';
        }

        // 2. Validate giá
        const price = String(formData.price || '').trim();
        if (!price) {
            newErrors.price = 'Giá không được để trống';
        } else if (Number(price) <= 0) {
            newErrors.price = 'Giá phải lớn hơn 0';
        } else if (Number(price) > 1000000) {
            newErrors.price = 'Giá không được vượt quá 1,000,000';
        }

        // 3. Validate loại sản phẩm
        const type = String(formData.type || '').trim();
        if (!type) {
            newErrors.type = 'Loại sản phẩm không được để trống';
        } else if (type.length < 2) {
            newErrors.type = 'Loại sản phẩm phải có ít nhất 2 ký tự';
        }

        // 4. Validate SKU
        const sku = String(formData.sku || '').trim();
        if (!sku) {
            newErrors.sku = 'SKU không được để trống';
        } else if (sku.length < 3) {
            newErrors.sku = 'SKU phải có ít nhất 3 ký tự';
        } else if (!/^[A-Z0-9-]+$/.test(sku)) {
            newErrors.sku =
                'SKU chỉ được chứa chữ hoa, số và dấu gạch (VD: PROD-001)';
        }

        const material = String(formData.material || '').trim();
        if (!material) {
            newErrors.material = 'Chat luong sản phẩm không được để trống';
        }

        // 5. Validate hình ảnh
        const imagesString = String(formData.imagesString || '').trim();
        if (imagesString) {
            const imageUrls = imagesString
                .split(',')
                .map((url) => url.trim())
                .filter((url) => url !== '');

            if (imageUrls.length > 0) {
                const invalidUrls = imageUrls.filter((url) => !isValidUrl(url));
                if (invalidUrls.length > 0) {
                    newErrors.imagesString = `Có ${invalidUrls.length} URL hình ảnh không hợp lệ. Vui lòng kiểm tra lại.`;
                }
            }
        }

        // 6. Validate mô tả
        const description = String(formData.description || '').trim();
        if (description.length > 500) {
            newErrors.description = 'Mô tả không được vượt quá 500 ký tự';
        }

        // 7. Validate kích cỡ
        if (!formData.sizes || formData.sizes.length === 0) {
            newErrors.sizes = 'Phải có ít nhất một kích cỡ';
        } else {
            // Kiểm tra từng kích cỡ
            const invalidSizes = formData.sizes.filter(
                (size) => !String(size.name || '').trim()
            );
            if (invalidSizes.length > 0) {
                newErrors.sizes = 'Tất cả kích cỡ phải có tên';
            }

            // Kiểm tra tổng số lượng
            const totalQuantity = formData.sizes.reduce(
                (sum, size) => sum + Number(size.quantity || 0),
                0
            );
            if (totalQuantity === 0) {
                newErrors.sizes = 'Tổng số lượng sản phẩm phải lớn hơn 0';
            }
        }

        return newErrors;
    };

    // 4. Hàm bấm nút "Sửa"
    const handleEdit = (product) => {
        setEditId(product._id);
        setIsFormVisible(true);
        setErrors({}); // Xóa lỗi cũ khi mở form
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

        // Validate dữ liệu trước khi submit
        const validationErrors = validateFormData();

        if (Object.keys(validationErrors).length > 0) {
            // Nếu có lỗi, hiển thị lỗi và dừng submit
            setErrors(validationErrors);
            alert('❌ Vui lòng kiểm tra lại các trường dữ liệu!');
            return;
        }

        // Xóa lỗi cũ nếu validation thành công
        setErrors({});

        const payload = {
            name: String(formData.name || '').trim(),
            price: Number(formData.price),
            description: String(formData.description || '').trim(),
            type: String(formData.type || '').trim(),
            material: String(formData.material || '').trim(),
            SKU: String(formData.sku || '').trim(),
            images: String(formData.imagesString || '')
                .split(',')
                .map((url) => url.trim())
                .filter((url) => url !== ''),
            size: formData.sizes.map((s) => ({
                name: String(s.name || '').trim(),
                quantity: Number(s.quantity || 0)
            }))
        };

        console.log('📋 DEBUG - editId:', editId);
        console.log(
            '📋 DEBUG - Payload gửi đi:',
            JSON.stringify(payload, null, 2)
        );

        try {
            if (editId) {
                console.log(`🚀 Gọi API UPDATE product với ID: ${editId}`);
                const response = await updateProduct(editId, payload);
                console.log('✅ Response từ UPDATE:', response);
                alert('✅ Cập nhật sản phẩm thành công!');
            } else {
                console.log('🚀 Gọi API CREATE product mới');
                const response = await createProduct(payload);
                console.log('✅ Response từ CREATE:', response);
                alert('✅ Thêm sản phẩm mới thành công!');
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
            setErrors({});
            fetchProducts();
        } catch (error) {
            console.error('❌ LỖI KHI GỌI API:', error);
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
            console.error('Message:', error.message);

            // Kiểm tra lỗi 401 - Unauthorized
            if (error.response?.status === 401) {
                alert('❌ Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.');
                window.location.href = '/login';
                return;
            }

            const errorMsg = error.response?.data?.message || error.message;
            alert('❌ Lỗi: ' + errorMsg);
        }
    };

    // 6. Xóa sản phẩm
    const handleDelete = async (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await deleteProduct(id);
                fetchProducts();
            } catch (error) {
                if (error.response?.status === 401) {
                    alert(
                        '❌ Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.'
                    );
                    window.location.href = '/login';
                    return;
                }
                alert(
                    '❌ Lỗi xóa: ' +
                        (error.response?.data?.message || error.message)
                );
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
        setErrors({}); // Xóa lỗi khi hủy form
    };

    return (
        <div className={styles.container}>
            <h1>Manage Products</h1>

            {/* Nút Mở Form Thêm Mới */}
            {!isFormVisible && (
                <button
                    onClick={() => {
                        setIsFormVisible(true);
                        setErrors({}); // Xóa lỗi cũ khi mở form
                    }}
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
                                style={{
                                    borderColor: errors.name ? '#ff6b6b' : ''
                                }}
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {errors.name && (
                                <span
                                    style={{
                                        color: '#ff6b6b',
                                        fontSize: '12px',
                                        marginTop: '4px'
                                    }}
                                >
                                    {errors.name}
                                </span>
                            )}
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Price ($):</label>
                            <input
                                className={styles.input}
                                style={{
                                    borderColor: errors.price ? '#ff6b6b' : ''
                                }}
                                type='number'
                                name='price'
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                            {errors.price && (
                                <span
                                    style={{
                                        color: '#ff6b6b',
                                        fontSize: '12px',
                                        marginTop: '4px'
                                    }}
                                >
                                    {errors.price}
                                </span>
                            )}
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Type:</label>
                            <input
                                className={styles.input}
                                style={{
                                    borderColor: errors.type ? '#ff6b6b' : ''
                                }}
                                name='type'
                                value={formData.type}
                                onChange={handleChange}
                                placeholder='hoodie, t-shirt...'
                                required
                            />
                            {errors.type && (
                                <span
                                    style={{
                                        color: '#ff6b6b',
                                        fontSize: '12px',
                                        marginTop: '4px'
                                    }}
                                >
                                    {errors.type}
                                </span>
                            )}
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Material:</label>
                            <input
                                className={styles.input}
                                style={{
                                    borderColor: errors.material
                                        ? '#ff6b6b'
                                        : '' // Đổi viền đỏ nếu có lỗi
                                }}
                                name='material'
                                value={formData.material}
                                onChange={handleChange}
                                required // Thêm required cho đồng bộ với các ô khác
                            />
                            {/* Hiện dòng text báo lỗi đỏ ở dưới */}
                            {errors.material && (
                                <span
                                    style={{
                                        color: '#ff6b6b',
                                        fontSize: '12px',
                                        marginTop: '4px'
                                    }}
                                >
                                    {errors.material}
                                </span>
                            )}
                        </div>
                        <div className={styles.inputGroup}>
                            <label>SKU:</label>
                            <input
                                className={styles.input}
                                style={{
                                    borderColor: errors.sku ? '#ff6b6b' : ''
                                }}
                                name='sku'
                                value={formData.sku}
                                onChange={handleChange}
                                placeholder='VD: PROD-001'
                                required
                            />
                            {errors.sku && (
                                <span
                                    style={{
                                        color: '#ff6b6b',
                                        fontSize: '12px',
                                        marginTop: '4px'
                                    }}
                                >
                                    {errors.sku}
                                </span>
                            )}
                        </div>

                        {/* Full width inputs */}
                        <div
                            className={cls(styles.inputGroup, styles.fullWidth)}
                        >
                            <label>Image links (separated by commas):</label>
                            <textarea
                                className={styles.textarea}
                                style={{
                                    height: '60px',
                                    borderColor: errors.imagesString
                                        ? '#ff6b6b'
                                        : ''
                                }}
                                name='imagesString'
                                value={formData.imagesString}
                                onChange={handleChange}
                                placeholder='https://anh1.jpg, https://anh2.jpg'
                            />
                            {errors.imagesString && (
                                <span
                                    style={{
                                        color: '#ff6b6b',
                                        fontSize: '12px',
                                        marginTop: '4px',
                                        display: 'block'
                                    }}
                                >
                                    {errors.imagesString}
                                </span>
                            )}
                        </div>

                        <div
                            className={cls(styles.inputGroup, styles.fullWidth)}
                        >
                            <label>Description:</label>
                            <textarea
                                className={styles.textarea}
                                style={{
                                    height: '80px',
                                    borderColor: errors.description
                                        ? '#ff6b6b'
                                        : ''
                                }}
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                            />
                            {errors.description && (
                                <span
                                    style={{
                                        color: '#ff6b6b',
                                        fontSize: '12px',
                                        marginTop: '4px',
                                        display: 'block'
                                    }}
                                >
                                    {errors.description}
                                </span>
                            )}
                            <span
                                style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    marginTop: '4px',
                                    display: 'block'
                                }}
                            >
                                {formData.description.length}/500 ký tự
                            </span>
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
                                disabled={Object.keys(errors).length > 0}
                                style={{
                                    opacity:
                                        Object.keys(errors).length > 0
                                            ? 0.5
                                            : 1,
                                    cursor:
                                        Object.keys(errors).length > 0
                                            ? 'not-allowed'
                                            : 'pointer'
                                }}
                                className={cls(styles.submitBtn, {
                                    [styles.update]: !!editId,
                                    [styles.create]: !editId
                                })}
                                title={
                                    Object.keys(errors).length > 0
                                        ? 'Vui lòng sửa các lỗi trước khi lưu'
                                        : ''
                                }
                            >
                                {editId ? 'Update' : 'Save Product'}
                            </button>
                            <button
                                type='button'
                                onClick={handleCancel}
                                className={styles.cancelBtn}
                            >
                                Cancel
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
