package org.o7planning.sbangularjs.servies;

import org.springframework.data.domain.Page;

/**
 * Created by: Rith RON.
 * On 10/6/2017.
 */
public interface IOperations<T> {
    public Page<T> findPaginated(final int page, final int size);
}
