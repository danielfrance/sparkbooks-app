export function useData(endpoint, dataOptions = {}) {
    const [
        data,
        loading,
        error,
        onLoad,
        onErrorInner,
        onLoading,
    ] = useLoaderState({
        loading: dataOptions.initialLoading,
        data: dataOptions.initialData || [],
    })
    const onError = useCallback(
        realError => {
            const { data: errResponse } = realError.response
            const errorToStore = dataOptions.errorMsg || realError
            if (errResponse.code === 405) {
                Alert.error(errResponse.error)
            } else if (typeof dataOptions.errorMsg === 'string') {
                Alert.error(errorToStore)
            }
            onErrorInner(errResponse.code === 405 ? errResponse : errorToStore)
        },
        [dataOptions.errorMsg, onErrorInner],
    )
    const fetchData = useCallback(
        async (...rest) => {
            onLoading()
            try {
                const axiosResponse = await axios[dataOptions.reqType || 'get'](
                    `${endpoint}`,
                    ...rest,
                )

                if (axiosResponse.status === 200) {
                    const { data: resp } = axiosResponse

                    const responseData = resp.current_page
                        ? resp
                        : get(
                              axiosResponse,
                              'data.data',
                              get(axiosResponse, 'data', axiosResponse),
                          )

                    onLoad(responseData)
                } else {
                    onError(axiosResponse)
                }
            } catch (err) {
                onError(err)
            }
        },
        [endpoint, onLoad, onError, onLoading, dataOptions.reqType],
    )
    return [data, fetchData, loading, error]
}
