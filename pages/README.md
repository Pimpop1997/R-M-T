
# [ชื่อโมดูล/หน้า] - README

## 1. สรุปฟีเจอร์ (Feature Overview)
- [อธิบายหน้าหรือโมดูลนี้ใช้งาน/แสดงอะไร เช่น "Feed แสดงโพสต์ทั้งหมด ผู้ใช้สามารถโพสต์ คอมเมนต์ ไลค์ได้"]
- [ลิงก์ไปยังส่วนที่เกี่ยวข้อง เช่น โอนเครดิต, ยืมเครดิต, สัตว์เลี้ยง ฯลฯ]

---

## 2. UI Example / โครงสร้าง UI
- [แนบภาพ Screenshot (ถ้ามี)]
- [วางตัวอย่างโค้ด UI (Component หลัก)]

---

## 3. API ที่เชื่อมต่อ (API Endpoints)
| Method | Endpoint                | Payload / Params         | Description                 | ตัวอย่าง Response      |
|--------|------------------------|--------------------------|-----------------------------|------------------------|
| GET    | `/api/posts`           | -                        | ดึงโพสต์ทั้งหมด            | `{ posts: [...] }`     |
| POST   | `/api/posts`           | `{ content }`            | สร้างโพสต์ใหม่             | `{ success: true }`    |
| ...    | ...                    | ...                      | ...                         | ...                    |

- [อธิบายวิธีเรียกแต่ละ endpoint ใน component, วางตัวอย่างโค้ด fetch/post/put]
- [ระบุข้อควรระวัง เช่น ต้องส่ง token/ต้อง validate อะไร]

---

## 4. โครงสร้างข้อมูล (Schema/Interface)
```ts
// ตัวอย่าง interface/schema ของข้อมูล
interface Post {
  id: number;
  user: {
    name: string;
    profileImage: string;
  };
  content: string;
  createdAt: string;
}
```
---

### **หมายเหตุสำหรับ Agent/ทีม**
- ทุกครั้งที่เพิ่ม/แก้ไขฟีเจอร์ใหม่หรือเชื่อม API **ต้องอัพเดท README.md นี้ให้ตรงกับโค้ด/endpoint ล่าสุด**
- ถ้าพบข้อกำกวม/ช่องโหว่ schema ให้แนะนำในข้อ 9 หรือเสนอ Pull Request ปรับปรุง

---

**ถ้าอยากได้ README ที่ customize ให้เหมาะกับโมดูล/หน้าเฉพาะ หรือแยกแบบ API Spec, UX, Test-only แจ้งเพิ่มได้เลยครับ!**  
**หรือจะขอตัวอย่าง README ที่กรอกเนื้อหาให้ครบตาม mock หน้า Feed, Profile, ฯลฯ ได้เช่นกัน** 🚀

