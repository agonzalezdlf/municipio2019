/**
 * @author Lsc. Mauricio Hernandez Leon.
 * @version 1.0
 *
 */
package mx.gob.municipio.centro.view.controller.configuracion;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import mx.gob.municipio.centro.model.gateways.sam.GatewayBitacora;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUsuarios;
import mx.gob.municipio.centro.view.bases.ControladorBase;


@Controller
@RequestMapping("/sam/configuracion/personas_usuarios.action")
public class ControladorUsuarios  extends ControladorBase {

	private static Logger log = 
        Logger.getLogger(ControladorUsuarios.class.getName());
	@Autowired
	GatewayUsuarios gatewayUsuarios;
	
	@Autowired
	GatewayUnidadAdm gatewayUnidadAdm;
	
	@Autowired
	public GatewayBitacora gatewayBitacora;
	
	
	public ControladorUsuarios(){		
	}		
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = {RequestMethod.GET,RequestMethod.POST})   
	public String  requestGetControlador( Map modelo, HttpServletRequest request ) {
		
		Long  cve_pers = (request.getParameter("cve_pers")!=null)? Long.parseLong(request.getParameter("cve_pers").toString()): 0;
		
		modelo.put("cve_pers",cve_pers);
    	modelo.put("accion",request.getParameter("accion"));
    	modelo.put("ejercicio",this.getSesion().getEjercicio());
    	modelo.put("persona", getUsuariosPorEjemplo(cve_pers));
    	modelo.put("usuario",this.getSesion().getIdUsuario());
		modelo.put("profesiones",this.getProfesiones());
		modelo.put("unidades",gatewayUnidadAdm.getUnidadAdmTodos());
	    return "sam/configuracion/personas_usuarios.jsp";
	}
		
	 public  void guardarUsuario(final Long idPersona,final String nombre,final String apaterno,final String amaterno,final String curp,final String rfc,final String profesion,final Integer idArea,final 
			 int idUnidad,final String login,final String password,final String estatus, final int ejercicio, final int cve_pers ){
	      try {                 
	            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
	          	  			  @Override
	                            protected void doInTransactionWithoutResult(TransactionStatus status) {	          	  				  
	          	  			  
		 Long idPersona2=gatewayUsuarios.actualizarPersonaPrincipal(idPersona,nombre,apaterno,amaterno,curp,rfc,profesion);
		 
		 //if (idArea!=null)
		gatewayUsuarios.actualizarTRABAJADORPrincipal((idPersona!=null) ? idPersona:0L ,idPersona2, idUnidad);
		 if (login!=null && !login.equals("") )
			 gatewayUsuarios.actualizarUsuarioPrincipal((idPersona!=null) ? idPersona:0L, idPersona2, login, password , estatus, getSesion().getEjercicio(), getSesion().getIdUsuario());

	          	  			 }                                      
                });
} catch (DataAccessException e) {
	log.error("Error El registro no se inserto ", e);
}

     }
     
	@ModelAttribute("unidadesAdmiva")
	public List<Map<String, Object>> getUnidades(){
		return gatewayUnidadAdm.getUnidadAdmTodos();	
	} 
         
    public List getProfesiones(){    
    	return this.getJdbcTemplate().queryForList("SELECT * FROM SAM_PROFESION");
    }
    
    public List getAreasUnidad(String orId){    
    	return this.gatewayUnidadAdm.getAreasPorUnidad(orId);
    }
     
    public Map<String, Object> getUsuariosPorEjemplo(Long cve_pers) {		   
		   return gatewayUsuarios.getUser(cve_pers);
	}
}
