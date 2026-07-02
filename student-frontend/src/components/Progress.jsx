

function Progress({courseProgress}) {
    return (
        <section className="bg-white p-6 rounded-2xl shadow" role="region" aria-label="Course Progress">
          <h2 className="text-md font-semibold mb-4">Course Progress</h2>
          <div className="space-y-4">
            {courseProgress.map(({ course, percent }, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>{course}</span>
                  <span>{percent}%</span>
                </div>
                <div
                  className="w-full bg-gray-200 rounded h-2"
                  role="progressbar"
                  aria-valuenow={percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="bg-gray-500 h-2 rounded" style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
    );
}

export default Progress;
