package org.o7planning.sbangularjs.model;

import org.springframework.data.domain.Page;

/**
 * Created by DELL on 11/7/2018.
 */
public interface IOperations<T> {
    public Page<T> findPaginated(final int page, final int size);
}
