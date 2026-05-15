

export default function SafeMap({ mapUrl }) {
  return (
    <div style={{ width: '100%' }}>
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, width: '100%', minHeight: '260px', height: 'min(58vw, 450px)' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
