const details = [
    'entryType',
    'initiatorType',
]

module.exports = function logRaw(timing, metrics, entries) {
    setTimeout(
        () =>
            console.log(
                'Timing'.yellow.bold.underline,
                timing,
                'Metrics'.yellow.bold.underline,
                metrics.metrics.reduce(
                    (collection, item) => {
                        collection[item.name] = item.value;

                        return collection;
                    },
                {}),
                'Entries'.yellow.bold.underline,
                entries,
                entries.reduce((collection, entry) => {
                    details.forEach(detail => {
                        collection[detail][entry[detail]] = collection[detail][entry[detail]] || 0;
                        collection[detail][entry[detail]]++;
                    });

                    return collection;
                }, details.reduce((collection, detail) => {
                    collection[detail] = {};
                    return collection;
                }, {}))
            )
        ,
        500
    );
}

