import React, { useState } from 'react';

type WelcomeComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const WelcomeComponent: React.FC<WelcomeComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'parameterName': '',
    });
    const { _csrf, contextPath, doc, docsList, not, pageContext } = data;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name) setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit?.(formData);
    };

    return (
        <div className="modern-container">
            <div className="modern-card">
                <c:set var="contextPath" value={pageContext.request.contextPath}/>
        
        
        
        
        
        
        <header>
        <nav className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
            <a className="navbar-brand" href="/">App Name</a>
            {(pageContext.request.userPrincipal.name != null) && (
                <form onSubmit={handleSubmit} id="logoutForm" method="POST" action="{contextPath}/logout">
                    <input type="hidden" name={_csrf.parameterName} value={_csrf.token}/>
                </form>
                <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <a style="color:#FFFFFF" href="#">{pageContext.request.userPrincipal.name}</a>
                    </li>
                    <li className="nav-item">
                    	<a className="nav-link" onclick="document.forms['logoutForm'].submit()">Logout</a>
                    </li>
                 </ul>
                 </div>
            )}
        </nav>
        </header>
        
        <div className="container">
        
            {(pageContext.request.userPrincipal.name != null) && (
        		
        		<div className="row col-md-9 col-md-offset-2 custyle">
        	        <h3>Document List</h3>
        		</div>
               
                
                
        	    <div className="row col-md-6 col-md-offset-2 custyle">
        	    	<c:choose>
        	        	<c:when test={not empty docsList}>
        				    <div className="modern-table-wrapper"><table className="modern-table table table-hover" className="table table-striped custab">
        					    <thead>
        					        <tr>
        					            <th>Title</th>
        				        		<th>Description</th>
        					            <th className="text-center">Action</th>
        					        </tr>
        					    </thead>
        					    <c:forEach var="doc" items={docsList}>
        				            <tr>
        				                <td>{doc.title}</td>
        		   						<td>{doc.description}</td>
        				                <td className="text-center"><a className='btn btn-info btn-xs' href={doc.link} download><span className="glyphicon glyphicon-download"></span> Download</a></td>
        				            </tr>
        			            ))}
        			    	</table></div>
        		    	)}
        		    	: (
        		        	<h5>No document to display</h5>
        		        )
        	        }
        	    </div>
            )}
        
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script src="{contextPath}/resources/js/bootstrap.min.js"></script>
            </div>
        </div>
    );
};

export default WelcomeComponent;
