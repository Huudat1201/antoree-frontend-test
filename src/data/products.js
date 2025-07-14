export const mockProducts = [
  // Lập trình & Công nghệ
  { 
    id: 1, 
    name: 'Khóa học ReactJS Nâng Cao', 
    price: 899000, 
    image: 'https://placehold.co/600x400/3498db/ffffff?text=ReactJS', 
    shortDescription: 'Làm chủ React và các hooks nâng cao, Context API, và tối ưu hiệu năng.', 
    longDescription: 'Khóa học này đi sâu vào các khái niệm cốt lõi của React, giúp bạn xây dựng các ứng dụng phức tạp, có khả năng mở rộng và hiệu suất cao. Chúng ta sẽ tìm hiểu về custom hooks, state management với Redux Toolkit, và các kỹ thuật testing hiện đại.', 
    rating: 4.8, 
    reviews: 1250, 
    category: 'Lập trình' 
  },
  { 
    id: 5, 
    name: 'Python Cho Khoa Học Dữ Liệu', 
    price: 950000, 
    image: 'https://placehold.co/600x400/f1c40f/ffffff?text=Python+DS', 
    shortDescription: 'Học Python từ cơ bản và ứng dụng vào phân tích dữ liệu với Pandas, NumPy.', 
    longDescription: 'Khóa học này là bước khởi đầu hoàn hảo cho bất kỳ ai muốn bước chân vào lĩnh vực Khoa học Dữ liệu. Bạn sẽ được học cách xử lý, phân tích và trực quan hóa dữ liệu bằng các thư viện Python mạnh mẽ nhất.', 
    rating: 4.9, 
    reviews: 1800, 
    category: 'Lập trình' 
  },
  { 
    id: 9, 
    name: 'Lập trình Java từ Zero đến Hero', 
    price: 1100000, 
    image: 'https://placehold.co/600x400/e84393/ffffff?text=Java', 
    shortDescription: 'Nắm vững Java Core, OOP, và xây dựng ứng dụng Spring Boot đầu tay.', 
    longDescription: 'Khóa học toàn diện về Java, từ những khái niệm cơ bản nhất cho người mới bắt đầu đến việc xây dựng các ứng dụng web mạnh mẽ với Spring Boot. Phù hợp cho sinh viên và người đi làm muốn theo đuổi sự nghiệp lập trình Java.', 
    rating: 4.8, 
    reviews: 1650, 
    category: 'Lập trình' 
  },

  // Ngoại ngữ
  { 
    id: 2, 
    name: 'Luyện Thi IELTS Cấp Tốc 7.0+', 
    price: 1500000, 
    image: 'https://placehold.co/600x400/e74c3c/ffffff?text=IELTS', 
    shortDescription: 'Chiến lược làm bài thi hiệu quả cho cả 4 kỹ năng Nghe, Nói, Đọc, Viết.', 
    longDescription: 'Chương trình được thiết kế bởi các chuyên gia IELTS hàng đầu, cung cấp lộ trình học cá nhân hóa, bộ đề thi thử sát với thực tế và các buổi chữa bài chi tiết để giúp bạn đạt được band điểm mục tiêu.', 
    rating: 4.9, 
    reviews: 3400, 
    category: 'Ngoại ngữ' 
  },
  { 
    id: 6, 
    name: 'Giao tiếp Tiếng Anh Tự Tin', 
    price: 650000, 
    image: 'https://placehold.co/600x400/e67e22/ffffff?text=English+Comms', 
    shortDescription: 'Cải thiện phát âm, tăng vốn từ vựng và phản xạ giao tiếp tự nhiên.', 
    longDescription: 'Tập trung vào các tình huống giao tiếp hàng ngày và trong công việc, khóa học giúp bạn vượt qua nỗi sợ nói tiếng Anh, xây dựng sự tự tin và giao tiếp một cách lưu loát với người bản xứ.', 
    rating: 4.7, 
    reviews: 1500, 
    category: 'Ngoại ngữ' 
  },

  // Thiết kế & Marketing
  { 
    id: 3, 
    name: 'Thiết Kế UI/UX Cho Người Mới Bắt Đầu', 
    price: 450000, 
    image: 'https://placehold.co/600x400/9b59b6/ffffff?text=UI/UX', 
    shortDescription: 'Nắm vững nguyên tắc thiết kế, sử dụng Figma và xây dựng portfolio đầu tiên.', 
    longDescription: 'Khóa học này sẽ dẫn dắt bạn từ những khái niệm cơ bản về UI/UX đến việc thực hành trên các dự án thực tế. Bạn sẽ học cách nghiên cứu người dùng, tạo wireframe, prototype và hoàn thiện một sản phẩm số có giao diện đẹp và trải nghiệm tốt.', 
    rating: 4.7, 
    reviews: 850, 
    category: 'Thiết kế' 
  },
  { 
    id: 4, 
    name: 'Digital Marketing Toàn Diện A-Z', 
    price: 1200000, 
    image: 'https://placehold.co/600x400/2ecc71/ffffff?text=Marketing', 
    shortDescription: 'Từ SEO, Google Ads, Facebook Ads đến Content Marketing và Email Automation.', 
    longDescription: 'Trở thành một chuyên gia Digital Marketing với kiến thức bao quát tất cả các kênh quan trọng nhất. Khóa học cung cấp case study thực tế, hướng dẫn từng bước để bạn có thể tự tin triển khai các chiến dịch marketing hiệu quả.', 
    rating: 4.8, 
    reviews: 2100, 
    category: 'Marketing' 
  },
  { 
    id: 10, 
    name: 'Content Creator Chuyên Nghiệp', 
    price: 799000, 
    image: 'https://placehold.co/600x400/fd79a8/ffffff?text=Content', 
    shortDescription: 'Xây dựng kịch bản, quay dựng video và phát triển kênh trên các nền tảng mạng xã hội.', 
    longDescription: 'Học cách tạo ra nội dung hấp dẫn, thu hút hàng triệu lượt xem. Khóa học bao gồm kỹ năng lên ý tưởng, viết kịch bản, kỹ thuật quay phim bằng điện thoại và máy ảnh, cũng như cách tối ưu hóa cho YouTube, TikTok, và Instagram.', 
    rating: 4.9, 
    reviews: 1900, 
    category: 'Marketing' 
  },

  // Kỹ năng & Phát triển bản thân
  { 
    id: 7, 
    name: 'Quản Lý Dự Án Bằng Agile & Scrum', 
    price: 750000, 
    image: 'https://placehold.co/600x400/1abc9c/ffffff?text=Agile', 
    shortDescription: 'Học cách quản lý dự án linh hoạt, hiệu quả và tối ưu hóa quy trình làm việc nhóm.', 
    longDescription: 'Khóa học cung cấp kiến thức sâu về phương pháp luận Agile và framework Scrum, giúp bạn dẫn dắt đội nhóm thành công, giao sản phẩm đúng hạn và đáp ứng tốt nhất yêu cầu của khách hàng.', 
    rating: 4.8, 
    reviews: 980, 
    category: 'Kỹ năng mềm' 
  },
  { 
    id: 11, 
    name: 'Kỹ Năng Thuyết Trình Trước Đám Đông', 
    price: 399000, 
    image: 'https://placehold.co/600x400/0984e3/ffffff?text=Public+Speaking', 
    shortDescription: 'Tự tin làm chủ sân khấu, trình bày ý tưởng một cách logic và thuyết phục.', 
    longDescription: 'Vượt qua nỗi sợ hãi, học cách xây dựng cấu trúc bài nói, sử dụng ngôn ngữ cơ thể hiệu quả và tương tác với khán giả để trở thành một người diễn giả cuốn hút.', 
    rating: 4.7, 
    reviews: 880, 
    category: 'Kỹ năng mềm' 
  },

  // Kinh doanh & Tài chính
  { 
    id: 8, 
    name: 'Đầu Tư Chứng Khoán Cho Người Mới', 
    price: 499000, 
    image: 'https://placehold.co/600x400/27ae60/ffffff?text=Stock+Investing', 
    shortDescription: 'Hiểu về thị trường, phân tích cơ bản và kỹ thuật để đưa ra quyết định đầu tư thông minh.', 
    longDescription: 'Đừng để thị trường chứng khoán là một nơi đáng sợ. Khóa học này sẽ trang bị cho bạn những kiến thức nền tảng vững chắc, từ cách đọc bảng giá, phân tích báo cáo tài chính đến việc xây dựng một danh mục đầu tư dài hạn.', 
    rating: 4.9, 
    reviews: 2500, 
    category: 'Tài chính' 
  },
  { 
    id: 12, 
    name: 'Khởi Nghiệp Kinh Doanh Online', 
    price: 550000, 
    image: 'https://placehold.co/600x400/6c5ce7/ffffff?text=Startup', 
    shortDescription: 'Tìm kiếm ý tưởng, xây dựng thương hiệu và bán hàng trên các sàn thương mại điện tử.', 
    longDescription: 'Hướng dẫn chi tiết từng bước để bạn có thể bắt đầu công việc kinh doanh online của riêng mình, từ việc lựa chọn sản phẩm, xây dựng fanpage, chạy quảng cáo hiệu quả cho đến việc chăm sóc khách hàng.', 
    rating: 4.8, 
    reviews: 1300, 
    category: 'Kinh doanh' 
  },

  // Nghệ thuật & Sức khỏe
  { 
    id: 13, 
    name: 'Nhiếp Ảnh Cơ Bản Với Điện Thoại', 
    price: 299000, 
    image: 'https://placehold.co/600x400/a29bfe/ffffff?text=Photography', 
    shortDescription: 'Nắm vững bố cục, ánh sáng và kỹ thuật chỉnh sửa ảnh ngay trên smartphone.', 
    longDescription: 'Biến chiếc điện thoại của bạn thành một công cụ sáng tạo nghệ thuật. Khóa học sẽ chỉ cho bạn các quy tắc vàng về bố cục, cách tận dụng ánh sáng tự nhiên và các ứng dụng chỉnh sửa ảnh mạnh mẽ để tạo ra những bức ảnh ấn tượng.', 
    rating: 4.7, 
    reviews: 2150, 
    category: 'Nghệ thuật' 
  },
  { 
    id: 14, 
    name: 'Yoga Cho Người Mới Bắt Đầu', 
    price: 350000, 
    image: 'https://placehold.co/600x400/55efc4/ffffff?text=Yoga', 
    shortDescription: 'Cải thiện sự dẻo dai, giảm căng thẳng và tìm lại sự cân bằng cho cơ thể và tâm trí.', 
    longDescription: 'Chuỗi bài tập Yoga được thiết kế đặc biệt cho người mới, giúp bạn làm quen với các tư thế cơ bản một cách an toàn và hiệu quả, cải thiện sức khỏe thể chất và tìm thấy sự bình yên trong tâm hồn.', 
    rating: 4.9, 
    reviews: 3100, 
    category: 'Sức khỏe' 
  },
];
