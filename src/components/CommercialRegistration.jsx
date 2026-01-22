import Image from "next/image";

export default function CommercialRegistration({
  title = "เอกสารทะเบียนพาณิชย์",
  src = "/Commercial-registration.jpg",
  alt = "Commercial Registration - PG Mobile Limited Partnership",
  width = 380,
  height = 520,
  caption = "ใช้เพื่อยืนยันตัวตนทางกฎหมายของผู้ประกอบการ",
  className = ""
}) {
  return (
    <div className={`mt-4 text-center ${className}`}>
      {title ? <h3 className="h6 mb-2 text-muted">{title}</h3> : null}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="img-fluid rounded border"
      />

      {caption ? <p className="mt-2 small text-muted mb-0">{caption}</p> : null}
    </div>
  );
}
