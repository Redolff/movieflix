import '../../style/profiles.css'

export const ProfileSkeleton = () => {
  return (
    <div className="account-container">
      <section className="profiles-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-avatar shimmer"></div>
            <div className="skeleton-name shimmer"></div>
          </div>
        ))}
      </section>
    </div>
  )
}