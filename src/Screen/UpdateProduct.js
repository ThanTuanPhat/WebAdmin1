import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Update.css";

const UpdateProduct = (props) => {
  // lấy id từ url;
  let { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [preserves, setPreserves] = useState([]);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState("");
  const [fiber, setFiber] = useState("");
  const [oum, setOum] = useState("");
  const [preserve, setPreserve] = useState("");
  const [supplier, setSupplier] = useState("");
  const [uses, setUses] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:6677/products/getProductDetailById_App/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const product = result.products;
        setName(product.name);
        setCategory(product.category.category_id);
        setQuantity(product.quantity);
        setOrigin(product.origin);
        setPrice(product.price);
        setFiber(product.fiber);
        setOum(product.oum);
        setPreserve(product.preserve.preserve_id);
        setSupplier(product.supplier);
        setUses(product.uses);
        setImages(product.images);
        setDescription(product.description);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    getProducts();
  }, [id]);

  // useEffect(() => {
  //   if (categories.length > 0 && preserves.length > 0) {
  //     // Bảo đảm dữ liệu đã tải xong trước khi đặt giá trị mặc định
  //     setCategory((prev) => prev || product.category._id);
  //     setPreserve((prev) => prev || product.preserve._id);
  //   }
  // }, [categories, preserves]);

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await fetch("http://localhost:6677/categories");
      const result = await response.json();
      setCategories(result.data);
      if (result.data.length > 0 && !category) {
        // Chỉ thiết lập category nếu chưa có giá trị
        setCategory(result.data[0]._id);
      }
    };
    getAllCategories();
  }, [category]);

  useEffect(() => {
    const getAllPreserves = async () => {
      const response = await fetch("http://localhost:6677/preserves");
      const result = await response.json();
      setPreserves(result.data);
      if (result.data.length > 0 && !preserve) {
        // Chỉ thiết lập preserve nếu chưa có giá trị
        setPreserve(result.data[0]._id);
      }
    };
    getAllPreserves();
  }, [preserve]);

  const uploadToCloundinary = async () => {
    try {
      const file = document.getElementById("image").files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ml_default");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dffuzgy5h/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      setImages([...images, result.secure_url]);
    } catch (error) {
      console.error("Failed to upload image:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể upload ảnh!",
      });
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrl) {
      setImages([...images, imageUrl]);
      setImageUrl(""); // Reset input
    }
  };

  const removeImage = (img) => {
    const newImages = images.filter(
      (item) => item.toString() !== img.toString()
    );
    setImages(newImages);
  };

  // const handleCancle = async() => {
  //   try {

  //   } catch (error) {

  //   }
  // }

  const handleSubmit = async () => {
    try {
      // bắt lỗi
      if (
        !name ||
        !price ||
        !quantity ||
        images.length === 0 ||
        !category ||
        !preserve
      ) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Vui lòng điền đầy đủ thông tin cần thiết!",
        });
        return;
      }

      console.log(preserve); // Kiểm tra preserve ID

      const body = {
        name: name,
        category: category,
        quantity: quantity,
        origin: origin,
        price: price,
        fiber: fiber,
        oum: oum,
        preserve: preserve,
        supplier: supplier,
        uses: uses,
        images: images,
        description: description,
      };
      const result = await fetch(
        `http://localhost:6677/products/${id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const response = await result.json();
      // debugger
      if (response.status) {
        // alert("Thêm sản phẩm thành công");
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Sửa sản phẩm thành công",
        });
        // reset form
        setName("");
        setCategory("");
        setQuantity("");
        setOrigin("");
        setPrice("");
        setFiber("");
        setOum("");
        setPreserve("");
        setSupplier("");
        setUses("");
        setImages([]);
        setDescription("");
        // quay về trang ds
        // window.location.href = "/products";
        navigate("/products");
      } else {
        // alert("Thêm sản phẩm không thành công");
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Sửa sản phẩm thất bại",
        });
      }
    } catch (error) {
      console.log("....Loi:", error);
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        text: "Sửa sản phẩm thất bại",
      });
    }
  };

  return (
    <div className="container">
      <form className="form-container">
        <div className="titleF">
          <h1>Thêm sản phẩm</h1>
        </div>

        <div className="n-c-q-x-container">
          <div className="mb-4 mt-4">
            <div className="inside-container">
              <label className="form-label">Sửa sản phẩm:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="inside-container">
              <label className="form-label">Danh mục:</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <div className="inside-container">
              <label className="form-label">Số lượng:</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="inside-container">
              <label className="form-label">Xuất xứ:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter description"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="g-d-c-l-container">
          <div className="mb-3">
            <div className="inside-container">
              <label className="form-label">Giá sản phẩm:</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="inside-container">
              <label className="form-label">Chất sơ:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter fiber"
                value={fiber}
                onChange={(e) => setFiber(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="inside-container">
              <label className="form-label">Đơn vị đo:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter oum"
                value={oum}
                onChange={(e) => setOum(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="inside-container">
              <label className="form-label">Loại hàng:</label>
              <select
                className="form-select"
                value={preserve}
                onChange={(e) => setPreserve(e.target.value)}
              >
                {preserves.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="n-c-a-container">
          <div className="mb-3">
            <div className="inside-container">
              <label className="form-label"> Nhà cung cấp:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter oum"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="inside-container">
              <label className="form-label">Công dụng:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter description"
                value={uses}
                onChange={(e) => setUses(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="inside-container">
              <label className="form-label">Ảnh từ thiết bị:</label>
              <input
                type="file"
                className="form-controlimg"
                id="image"
                onChange={uploadToCloundinary}
              />
            </div>
            <div className="inside-container mt-2">
              <label className="form-label">Hoặc dán link ảnh:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Dán link ảnh vào đây"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleAddImageUrl}
              >
                Thêm link ảnh
              </button>
            </div>
          </div>
          <div className="image-preview-container">
            {images.map((item, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  display: "inline-block",
                  margin: "5px",
                }}
              >
                <img
                  src={item}
                  alt=""
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <button
                  onClick={() => removeImage(item)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <div className="inside-container">
            <label className="form-label">Mô tả:</label>
            <textarea
              className="form-controlD"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="btn-container2">
          <a href="/products" className="btn-primaryC">
            Hủy
          </a>
          <button onClick={handleSubmit} type="button" className="btn-primary">
            Sửa
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
