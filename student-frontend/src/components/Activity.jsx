function Activity({announcements, recentActivities}) {
    return (
                <section className='grid gap-4 grid-cols-2' role="region" aria-label="Announcements and Recent Activity">
        <div className="w-full bg-white p-6 px-14 rounded-2xl shadow">
        {/* Announcements */}
          <h2 className="text-md font-semibold mb-4">Announcements</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
            {announcements.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="w-full bg-white p-6 px-14 rounded-2xl shadow">
          <h2 className="text-md font-semibold mb-4">Recent Activity</h2>
          <ul className="text-sm text-gray-700 space-y-3">
            {recentActivities.map((activity, i) => (
              <li key={i} className="flex items-center">
                {activity.icon}
                <span>{activity.text}</span>
              </li>
            ))}
          </ul>
          </div>
          </section>
    )
}

export default Activity;