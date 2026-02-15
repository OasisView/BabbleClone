Building an MVP of this scale in roughly **22.5 hours** is a high-intensity sprint. To succeed by Wednesday, you must adhere to a "Steel Thread" policy—building only what is necessary to prove your "Cognitive Deciphering" concept works.

Below is your revised **PRD (Product Requirements Document)** tailored specifically for your vision of introductory immersive modules.

---

#     **PRD: Project "LingoVision" (Babbel-style MVP)**

**Status:** Sprint Ready | **Timeline:** Sunday – Wednesday | **Team:** Michael (FE), Manuel (BE)

## **1\. Objective**

To build a functional language learning interface that uses **Visual-First Deciphering**. This allows users to "decode" the target language by hearing it and seeing a picture *before* being confirmed by text, reducing the brain's reliance on native-language translation.

## **2\. The "Introductory Module" Logic**

Every unit will begin with a **Decipher Phase**.

* **Step 1:** User sees a high-quality image and hears the target language audio. (No text visible).  
* **Step 2:** A 2-second delay occurs (the "thinking gap").  
* **Step 3:** The **Target Language Text** appears (fade-in).  
* **Step 4 (Later Drills only):** The English translation is provided as a secondary "bridge."

---

## **3\. "Must-Haves" (For Wednesday Completion)**

### **A. Core Lesson Engine**

* **Audio Trigger:** A "Start Unit" button (to bypass browser autoplay blocks).  
* **Sequential Reveal Logic:** Image/Audio $\\rightarrow$ 2s Timer $\\rightarrow$ Target Text Reveal.  
* **Linear Navigation:** "Next" and "Back" buttons for card progression.  
* **Progress Bar:** A simple top-mounted bar showing lesson completion percentage.

### **B. Card Types**

* **Introductory (Decipher) Card:** Image \+ Audio $\\rightarrow$ Target Text only.  
* **Drill (Review) Card:** Image \+ Target Text \+ English Translation (visible or toggleable).  
* **Linguistic Concept Card:** A text-centric card for grammar tips (e.g., "The 'a' at the end of 'Manzana' means it's feminine").

### **C. Technical Infrastructure**

* **Static JSON API:** Manuel provides endpoints for /units and /units/:id.  
* **Cloud Hosting:** Images/Audio hosted on Cloudinary or S3.  
* **Deployment:** Vercel (Frontend) and Render/Railway (Backend).

---

## **4\. "Must-Not-Do" (Strictly Out of Scope)**

Adding these will likely cause you to miss your Wednesday deadline.

* **❌ User Accounts:** No Sign-up, Login, or Profile pictures.  
* **❌ Persistence:** No "saving progress" to a database yet; use local state only.  
* **❌ Speech Recognition:** No "record your voice" features.  
* **❌ Content Management UI:** Manuel should manage content in the DB/JSON directly.  
* **❌ Complex Animations:** Stick to simple CSS opacity transitions.

---

## **5\. Success Criteria**

1. A user can visit the site and click "Start."  
2. The user completes a 10-card unit following the **Image $\\rightarrow$ Audio $\\rightarrow$ Text** sequence.  
3. The transition from the "Introductory" card (no English) to "Drill" cards (with English) is clear.  
4. The app functions smoothly on both Desktop and Mobile browsers.

run upgrade head to build the table schemas.

* Authentication: Passlib with JOSE (JWT). It uses the sha256\_crypt algorithm for password security (as seen in your auth.py).  
* Task Queue/Cache: Redis. Used for session management and likely as a broker for log processing.  
* Server: Uvicorn/Gunicorn. The ASGI server that runs the FastAPI app inside your Docker container.

![:art:][image1] Frontend Tech Stack (The "Face")

The frontend is a single-page application (SPA) that communicates with the backend via JSON.

* Framework: React.js (Most likely, given the "Sources" component structure and state management behavior).  
* Language: TypeScript. Most modern FastAPI clones use TS to match the backend's data models.  
* Styling: Tailwind CSS. Common in this specific project template for the dashboard layout.  
* API Client: Axios or Fetch API. This is what sends the login requests and file uploads that were hitting the 422 errors.  
* State Management: Likely React Query or Redux. This explains why the "Sources" page appeared empty until a "Hard Refresh" cleared the old cache.

![:building\_construction:][image2] Infrastructure (The "Skeleton")

* Containerization: Docker & Docker Compose. Everything is isolated into backend, postgres, and redis services.  
* Reverse Proxy: Nginx. Often sits in front of the frontend to serve the static files and route API calls.

![:warning:][image3] Why the "422" is the Key to the Stack

The 422 Unprocessable Entity error is the "glue" between these stacks.

The Frontend sends a JSON object or a File.

1. The Backend (FastAPI/Pydantic) compares that data against a "Schema."  
2. If the Date is wrong (not 2026\) or a Field is missing, the stack rejects it before it even touches the Database.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAADnklEQVR4Xq2Ra0wTZhSGD1AlOsMUlQAZZoTiItSulgGixSAg0AprQ10dkJm5uZvipmiyaaaJ4TI1CzcptNxKQS4CQjdBQWcizMnmUkAoXVtqWxiDuRES/xhD2+9d56KbbD/3JOfHSd7znJzvI/q/uVtE1HA4kO7ke1HPyfV0u2D10sh/c+1EMDlUy8lY7E3jJX6CoXNr877L51wwneN83H1FscKkCiRL1Rofq9qfrMpVS8f/4vvC1T53CoN2D55Z5hwt9WfD5RvYcGEACx8NZhnT8e6q61HO8apA/FZHfuggmi9davCAWT7dLvRD55cxbCyfMFIRAGvpBvhcW4nDczsguv4ymywLYKbqUEw1hlkfav3ovob3vKTn4Hr7zVMr3dJqHXgDZnD7ZmHUREB/PhRh/euwb5gPQ20kjC089nhhDyYbX4VdHSx1N/9TkhsCfXEAE7TOgNtqgaDDjvf6r2JUGQpbXTgM1ZEYreBivIqPBb0AjxwSPLwVCXPlJprrPUD3yiKJbp1OfvBjMdc9VslDytl+JNbrISnogqFyI8bUmzGpjYJBvQUWbaxHHAVbDxfTvUI21S7GTGs8OVoTiIaKMj+ZUEUt6iu2wlIvgr5ciJslWzGh5sGsEcDUEAdDzWtsqi3JaWra6bRcTGI/d70OW7sUjk7ZcfvlTA7dq8ilnqPR0z9p0z1vIYapMR3DKgkMdXEwNyXD0pgIY02060ws0bYXfUm4jgOzJ/uo7H1YWjPZVJdMSLrzp+lKeze1H9oES5vMs2UPlFv6cSl9EPkxOox4TrI1JzBb227YO9LrRuriv/lFp3Dj3b1w5e1j1t7jIO2nOaQ9touUH0VHPejLds1dlbDOlEF8lXEXtcIBaPgjMDemYvbrTJfnBOdMt8w1pXuDmRQZcOeK2eOzcjz7pUsKolPJq8T1+7kYUiWzg4Jy5CVdwJG0fMzq0vC5JxPh6zU0fyPHZWlJZw5dNsaaFZ7K+ltyNHYNnUggzjF5EO/bsrRF+8UduK8VwdYigbU5FfbOzCe5ZH/69Qe1eHG8IYONNUgXB1VZ7zyT/IlU+BLt3/YCyfkcSuT69tZ8JsJCn9zp6JSyAVVWy/yNbJ+3YtZ6yzb60Zui0C/6S3KoqeBDr+ckT9nFDyKRIIxkcaG03NMfkUZsrz25l4oOpFL4MiJjVzZ9IBeRTqNcOvpv3t4ZQlkpAjokecX792ENbQ/2ooQQH5q4nPWknvIHy0Hct9mhbVMAAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAADbElEQVR4Xo2TW0zTVxzHf7aGZMle0D34MBPwkqw4ENQRvNIWbEc7IY4SxijVgDdM1I2LjlmdM46LCixehgp0EwQMiJBi6UUu1gqltmS0iCjSG7O0/ZPaFmVchvntzx5aSvbgJ/m9nM8533PyO+cAkFz4+cRynIz/5k75ZioiQo9GuzD84XC4CXA89/R+BjN+bm9a3rHgjwAOHj5EDV23Bl6ZLEun/z8ZAgGgJgK8PfTndllSME+QA3n5uTHf5Xz/w5Gj2ZDO51MX5uE0sXSpH6/ma61NwXrs6WVptaIok6ePo3KrWbK3Om4TWpNP6VsTu5DI2otu4Q6cLtyEqFyFbytWIw5+PC0CMA4MkDuMZKa96d13Yr6fc92r5lz7R8MumlTzLs2qmDl2WdwfM9o9wuH62PMtFzd13v6JU/ZnddhLcryUkNPLLKUANm0twKT6y1Zj42ac0SWK9L9/jlNP2bWEIhpdyt29dnn0lOtRXN9r6U6VuT22ySpNqCzJiZ7VV0WgsYWdLb/Fh2cdNwCe1tNh/mW+4GYqgEf1VceoIh2G2r4FlYgJbY0NUHXpVyAvbBlagYJYB+YWXuy7Dnb+SOM26pNqLpjNdvIkj3dRvbpDFyZkMTDxMP6ZXGxZ2jYfQuFpSnl52fqLJcVB44PdfuHp2kB9o8m6qqxJWvtaQnc6hxr9cglnhAWUG9d+oZ07VxgUIGbkK6huVbpkXJFywNWdMujsyQ3wi6k+DxRJ7XZsu3JnZYDQhQM4OlOVBdncYHMz42/vk4wAv5jLWWTITRr5qMs/MZlMfvGe7NpER7LR27UHHQreC6ec45eLWPgOq0NCKemCI2Pi1rpVASEL0nqfRRCyJOWr2+E4p8v0OcOVYsC7VYBuO6CHgJrKSqDRaC35Z86mIPEc0D4KqO8BmHpRB852rm2um1NBSHlNExKmL+S9uAH6+ex+aXy4Q0r/zHF0967pVnqYS749xPiAEWYXMzY4JKxID8wOlYGliTGJ6qwIS/0WnJJH+UIcddVg4LMeDXA3Gh4yw/R93EhDX0LEf6VJ2GiQcKP/6k2KGQVX536w3ds5hMrErePtaSffNX/qCyG6ZTBWdRk8olJwVZaApaKQrCIwkzXyWzFcPfvjsuHrRQBuWSJYG74YGBMnZ9raUg+gJNQX8qH8C8ZMt6XtA5TtAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAACBklEQVR4XpVSTWsTURS9+aAjrmpL20BBqyQ1mUTcVRF3rnTvxoXgxoU/QBTFhYKIgktxUci2YhFB7CZpmNSZVBv7kdFU2ojQilX3fpHSd7z3vbQmrwbxwuHMOffew7w3Q9Sl8C0kVTwUxR1+LhyI4nvDHvl3QdC43wv/IFC/MgCI8x+FF0cJeYpgLgksu0A1BdxmXc7Yo90LpeE4gmNXsZwFGjlo9sduYnowbs/+tbB4lvCc+VUSn/zDynEimkXjGfvVM/ZKZ+H9LT7KkTgqcowsftRcfTU/Q9e8jfjldBwr1+zVP4Uph79EgvDWbaq6q7CS1SFY5QDR7KPQT3hqb7YKGxOk/JOEIGkW5ELXciZkTe7FNb70Z8YI6w/tCCIVHOeAExcQpjZRH4XGesaEfMwYLQhHN/nSL8FLdwbgy2PC7GnC/DDwZr9iCPPySCtkxGgDhQWeq5wifH3SCmh+Jny4S/ASC6j1oQPv+vDgxl7Nu3peoo7V6wTV5GPkOGjpMr9JD7C4RzGEd9CsOh26BYWXPD9/kfSfjHGKojgwhdesLYST5u+vTe7uaRT7S7hHEUmKosw0R4ohvIOlRyZE2O7p+RnmX3BIFfhYsyy6QFW698WXfdoK0udUMDiOylBebSMYyotu92B5+pn3tvzUeVLevpgqUUxNUwxtEN3ubesOT/a83thvbQUWTuZ5cvwAAAAASUVORK5CYII=>