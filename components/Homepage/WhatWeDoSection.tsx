export default function WhatWeDoSection() {
    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-24">
            {/* Soft wave line background */}
            {/* <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src="/videos/b1.mp4" type="video/mp4" />
                </video>
            </div> */}

            <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
                <p className="mb-7 font-secondary text-[14px] font-medium tracking-[4px] text-[#9c2a83]">
                    What we Do
                </p>

                <h2 className="font-primary text-[24px] font-medium uppercase tracking-[8px] text-black md:text-[28px]">
                    We provide Natural Treatments
                </h2>

                <p className="mx-auto mt-12 max-w-[900px] font-secondary text-[24px] font-light leading-[1.45] tracking-[3px] text-[#8a8a8a] md:text-[26px]">
                    We provide{" "}
                    <span className="font-semibold tracking-[6px] text-black">
                        natural and clinical treatments
                    </span>{" "}
                    focused on precision-driven care for long-lasting skin health. Our
                    approach is{" "}
                    <span className="font-semibold tracking-[6px] text-black">
                        toxin-free
                    </span>{" "}
                    and uses organic, nature-powered products with proven{" "}
                    <span className="font-semibold tracking-[6px] text-black">
                        effectiveness, ensuring safe,
                    </span>{" "}
                    balanced treatments with no side effects....
                </p>
            </div>
        </section>
    );
}