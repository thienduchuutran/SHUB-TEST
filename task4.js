const axios = require('axios');


// Hàm lấy dữ liệu từ API
async function getData() {
    const response = await axios.get('https://test-share.shub.edu.vn/api/intern-test/input');
    return response.data;
}

// Hàm gửi kết quả tới API
async function sendResult(token, result) {
    await axios.post('https://test-share.shub.edu.vn/api/intern-test/output', result, {
        headers: { Authorization: `Bearer ${token}` }
    });    
}

async function main() {
    // Lấy dữ liệu từ API
    const { token, data, query } = await getData();
    console.log(token)
    const n = data.length;
    
    // Tạo mảng tổng tiền tố cho loại 1 và loại 2
    const prefixSum1 = new Array(n + 1).fill(0);
    const prefixSum2 = new Array(n + 1).fill(0);
    
    // Tính tổng tiền tố, tính trước để lát nữa chỉ cần gọi
    for (let i = 0; i < n; i++) {
        //Tổng các phần tử
        prefixSum1[i + 1] = prefixSum1[i] + data[i];

        //Tổng phần tử chẵn - lẻ
        prefixSum2[i + 1] = prefixSum2[i] + (i % 2 === 0 ? data[i] : -data[i]);
    }
    
    // Xử lý các truy vấn
    const result = query.map(q => {
        const l = q.range[0];
        const r = q.range[1];
        
        if (q.type === "1") {
            return prefixSum1[r + 1] - prefixSum1[l];
        } else if (q.type === "2") {
            return prefixSum2[r + 1] - prefixSum2[l];
        }
    });

    // Gửi kết quả tới API
    await sendResult(token, result);
}

main().catch(console.error);
