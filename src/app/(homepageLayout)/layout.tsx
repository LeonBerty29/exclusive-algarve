import NavBar from "@/components/layout/navbar";




export default function LayoutOne({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar colorChange={true} />
            {children}
        </>
    );
}
