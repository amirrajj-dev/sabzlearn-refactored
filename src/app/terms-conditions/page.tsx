import Footer from '@/components/shared/footer/Footer';
import Navbar from '@/components/shared/navbar/Navbar';
import React from 'react';

const TermsAndConditionsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl bg-base-300 my-10 rounded-lg shadow-xl mx-auto px-6 py-8 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8 text-base-content">
          شرایط و قوانین سبزلرن
        </h1>

        <section className="mb-8 p-6 bg-base-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-primary">مقدمه</h2>
          <p className="text-base-content leading-relaxed">
            کاربر گرامی، لطفاً موارد زیر را جهت استفاده بهینه از خدمات و برنامه‌های کاربردی آکادمی سبز لرن با دقت ملاحظه فرمایید. ورود کاربران به وب‌سایت آکادمی سبز لرن به معنای آگاه بودن و پذیرفتن شرایط و قوانین و نحوه استفاده از سرویس‌ها و خدمات آکادمی سبز لرن است. توجه داشته باشید که ثبت سفارش نیز در هر زمان به معنی پذیرفتن کامل کلیه شرایط و قوانین آکادمی سبز لرن از سوی کاربر است.
            <br /><br />
            آکادمی سبز لرن به منظور ارائه بهترین خدمات آموزشی، همواره در تلاش است تا محیطی امن و مطمئن برای کاربران فراهم کند. با استفاده از خدمات ما، شما موافقت می‌کنید که از این خدمات به صورت قانونی و مطابق با قوانین جمهوری اسلامی ایران استفاده کنید.
          </p>
        </section>

        <section className="mb-8 p-6 bg-base-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-success">شرایط محروم کردن کاربر از سرویس</h2>
          <p className="text-base-content leading-relaxed">
            سبزلرن در برخی شرایط که خارج از عرف و شرع و منطق نیست، کاربر را از سرویس محروم می‌کند. این مورد شامل دوره‌های نقدی نیز می‌شود و در صورت تخطی کاربر از تعهدات، سبزلرن بلافاصله سرویس او را تعلیق و هزینه‌های مربوطه را بلوکه می‌کند.
            <br /><br />
            در صورت مشاهده هرگونه تخلف از قوانین، مانند اشتراک گذاری غیرمجاز دوره‌ها، فروش اکانت یا دوره‌ها به دیگران، یا هرگونه استفاده غیرقانونی از خدمات، آکادمی سبز لرن حق دارد بدون اطلاع قبلی، دسترسی کاربر به خدمات را قطع کند. در چنین مواردی، کاربر هیچ حقی برای بازپس گیری هزینه‌های پرداخت شده نخواهد داشت.
          </p>
        </section>

        <section className="mb-8 p-6 bg-base-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-error">تعهدات کاربر</h2>
          <ul className="list-disc list-inside text-base-content leading-relaxed">
            <li>کاربر متعهد می‌شود دوره خریداری شده را با دیگران به اشتراک نگذارد.</li>
            <li>کاربر متعهد می‌شود اکانت خود را در اختیار دیگران قرار ندهد.</li>
            <li>کاربر متعهد می‌شود دوره خریداری شده را برای اهداف مختلف به فروش نرساند.</li>
            <li>کاربر متعهد می‌شود دوره را فقط به صورت تکی برای خودش خریداری کند.</li>
            <li>کاربر متعهد می‌شود اکانت خود را تحت هیچ شرایطی به فروش نرساند.</li>
            <li>کاربر متعهد می‌شود از خدمات آکادمی سبز لرن فقط برای اهداف آموزشی و غیرتجاری استفاده کند.</li>
            <li>کاربر متعهد می‌شود از هرگونه تلاش برای هک، نفوذ یا دسترسی غیرمجاز به سیستم‌های آکادمی سبز لرن خودداری کند.</li>
          </ul>
        </section>

        <section className="mb-8 p-6 bg-base-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-accent">شرایط عودت وجه</h2>
          <div className="text-base-content leading-relaxed">
            سبزلرن موظف است در شرایط خاصی مانند عدم ارائه پشتیبانی یا عدم بروزرسانی محتوا، هزینه دانشجو را عودت دهد. در صورت وجود شرایط استثنایی، دانشجو می‌تواند از طریق پنل کاربری درخواست خود را مطرح کند.
            <br /><br />
            با این حال، در موارد زیر عودت وجه امکان‌پذیر نخواهد بود:
            <ul className="list-disc list-inside mt-2">
              <li>اگر کاربر بیش از ۱۰ درصد از محتوای دوره را مشاهده کرده باشد.</li>
              <li>اگر کاربر از کد تخفیف یا طرح‌های تشویقی استفاده کرده باشد.</li>
              <li>اگر کاربر به دلیل تغییر شرایط شخصی (مانند تغییر شغل یا علاقه) درخواست عودت وجه کند.</li>
            </ul>
            <br />
            در صورت تایید درخواست عودت وجه، مبلغ پرداختی طی ۷ تا ۱۴ روز کاری به حساب کاربر واریز خواهد شد.
          </div>
        </section>

        <section className="mb-8 p-6 bg-base-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">قوانین عمومی</h2>
          <p className="text-base-content leading-relaxed">
            کلیه اصول و رویه‌های آکادمی سبز لرن منطبق با قوانین جمهوری اسلامی ایران است. در صورت تغییر قوانین، کاربر موظف به رعایت قوانین جدید است.
            <br /><br />
            آکادمی سبز لرن حق دارد در هر زمان و بدون اطلاع قبلی، شرایط و قوانین را تغییر دهد. این تغییرات بلافاصله پس از انتشار در وب‌سایت قابل اجرا خواهند بود. کاربران موظف هستند به صورت دوره‌ای این صفحه را بررسی کنند تا از آخرین تغییرات مطلع شوند.
            <br /><br />
            در صورت بروز هرگونه اختلاف یا مشکل، مرجع رسیدگی، دادگاه‌های صالحه در تهران خواهند بود.
          </p>
        </section>

        <section className="mb-8 p-6 bg-base-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-info">حریم خصوصی</h2>
          <p className="text-base-content leading-relaxed">
            آکادمی سبز لرن به حریم خصوصی کاربران احترام می‌گذارد و از اطلاعات شخصی آن‌ها محافظت می‌کند. اطلاعات کاربران فقط برای ارائه خدمات بهتر و بهبود تجربه کاربری استفاده می‌شود و در اختیار اشخاص ثالث قرار نخواهد گرفت.
            <br /><br />
            کاربران می‌توانند در هر زمان با مراجعه به پنل کاربری خود، اطلاعات شخصی را به‌روزرسانی یا حذف کنند. در صورت هرگونه سوال یا نگرانی، می‌توانید از طریق بخش پشتیبانی با ما در تماس باشید.
          </p>
        </section>

        <section className="mb-8 p-6 bg-base-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-warning">اطلاعات تماس</h2>
          <div className="text-base-content leading-relaxed">
            در صورت هرگونه سوال یا ابهام در مورد شرایط و قوانین، می‌توانید از طریق راه‌های زیر با ما در تماس باشید:
            <ul className="list-disc list-inside mt-2">
              <li>پشتیبانی آنلاین: از طریق پنل کاربری</li>
              <li>ایمیل: support@sabzlearn.ir</li>
              <li>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</li>
            </ul>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;